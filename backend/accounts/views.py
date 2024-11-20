from django.shortcuts import render
from django.http import JsonResponse
from django.db import IntegrityError
from django.contrib.auth import authenticate
from django.views.decorators.csrf import csrf_exempt

# LOCAL.
from .models import User, DiarySettings, Meal
from .serializers import UserSerializer
from diet.models import NutritionData
from project.lib import format_nutrients_from_request_body
from project import settings

# REST FRAMEWORK.
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.tokens import AuthUser
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response

import json

# Create your views here.
@api_view(('POST',))
@permission_classes([AllowAny])
def sign_up(request):
    """Signs up a user."""
    data = json.loads(request.body)
    # print(data)
    try:
        user = User.objects.create_user(**data)
        user.get_or_create_diary_settings()
        refresh = RefreshToken.for_user(user=user)
        return JsonResponse({
            'refreshToken': str(refresh),
            'accessToken': str(refresh.access_token),
        }, status=status.HTTP_201_CREATED)
    except IntegrityError as e:
        print(e)
        return JsonResponse({
            'error': str(e),
        }, status=status.HTTP_409_CONFLICT)
    except Exception as e:
        return JsonResponse({
            'error': f'There was an error {e}',
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@csrf_exempt # If you're using token authentication (e.g., JWT), Django REST framework typically disables CSRF checks because token authentication is stateless.
def login(request):
    # Ensure the request content type is JSON
    if request.content_type != 'application/json':
        return Response({"error": "Only JSON format is accepted"},
                        status=status.HTTP_400_BAD_REQUEST)
    # Parse JSON data.
    try:
        data = json.loads(request.body)
        username = data.get('username')
        password = data.get('password')
    except json.JSONDecodeError:
        return JsonResponse({"error": "Invalid JSON"}, status=status.HTTP_400_BAD_REQUEST)
    
    # Authenticate user.
    user = authenticate(username=username, password=password)
    
    if user is not None:
        # If authentication is successful, generate the JWT tokens.
        refresh = RefreshToken.for_user(user)
        
        return JsonResponse({
            'refreshToken': str(refresh),
            'accessToken': str(refresh.access_token)
        }, status=status.HTTP_200_OK)
    else:
        print(user)
        return JsonResponse({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)


@api_view(('POST', 'GET'))
@permission_classes([IsAuthenticated])
def meals_diary_settings(request):
    user = request.user
    diary_settings = user.get_or_create_diary_settings() # Make sure diary settings is not null.
    
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
        except json.JSONDecodeError:
            return Response({"error": "Invalid JSON data."}, status=status.HTTP_400_BAD_REQUEST)
        
        meals_data = {meal['order']: meal for meal in data[0: settings.DIARY_SETTINGS_MAX_N_MEALS]}
        created_meals = {meal.order: meal for meal in user.diary_settings.meals.all()}
        
        meals_to_update = []
        meals_to_create = []
        
        for key, meal_data in meals_data.items():
            meal = created_meals.get(key)
            if meal:  # Only update if meal already exists.
                meal.name = meal_data['name']
                meal.hide_from_diary = meal_data['hideFromDiary']
                meals_to_update.append(meal)
            else:   # Create a new meal object.
                created_meal = Meal(name=meal_data['name'],
                                    order=meal_data['order'],
                                    diary_settings=user.diary_settings,
                                    hide_from_diary=meal_data['hideFromDiary'])
                meals_to_create.append(created_meal)
        
        if meals_to_update:
            Meal.objects.bulk_update(meals_to_update, ['name', 'hide_from_diary'])
        if meals_to_create:
            Meal.objects.bulk_create(meals_to_create)
            
        return JsonResponse({
            "success": "Meal names have been updated."
        }, status=status.HTTP_200_OK)
        
    # GET REQUEST.
    mealsSettings = sorted([meal.to_json() for meal in diary_settings.meals.all()],
                           key=lambda m: m['order'])[:settings.DIARY_SETTINGS_MAX_N_MEALS]

    return JsonResponse({
        'mealsSettings': mealsSettings
    }, status=status.HTTP_200_OK)
    
    
    

@api_view(('GET', 'POST'))
@permission_classes([AllowAny])
def user_nutrition_goals(request):
    user = request.user
    diary_settings = user.get_or_create_diary_settings()
    
    if request.method == 'POST':
        user_nutrient_targets = user.diary_settings.nutrient_targets
        try:
            data = json.loads(request.body)
        except json.JSONDecodeError:
            return Response({"error": "Invalid JSON data."}, status=status.HTTP_400_BAD_REQUEST)
        
        user.diary_settings.budget = data.get('budget', diary_settings.budget)
        nutrient_targets = format_nutrients_from_request_body(data)
        
        for field, value in nutrient_targets.items():
            if hasattr(user_nutrient_targets, field):
                setattr(user_nutrient_targets, field, value)
        
        user_nutrient_targets.save()
        user.save()
        return Response({"success": "User daily targets have been saved."}, status=status.HTTP_200_OK)
    
    # GET request.
    return JsonResponse({
        "dailyTargets": {
            'budget': float(user.diary_settings.budget),
            **user.diary_settings.nutrient_targets.nutrients_in_json()
        }
    })

@api_view(('GET',))
@permission_classes([IsAuthenticated])
def get_user_diary_settings(request):
    user = request.user
    diary_settings = user.get_or_create_diary_settings()
    
    dailyTargets = {
            'budget': float(user.diary_settings.budget),
            **user.diary_settings.nutrient_targets.nutrients_in_json()
    }
    
    mealsSettings = sorted([meal.to_json() for meal in diary_settings.meals.all()], key=lambda m: m['order'])
    
    return JsonResponse({
        'dailyTargets': dailyTargets,
        'mealsSettings': mealsSettings
    }, status=status.HTTP_200_OK)


