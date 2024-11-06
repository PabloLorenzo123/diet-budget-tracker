from django.shortcuts import render
from django.http import JsonResponse
from django.db import IntegrityError
from django.contrib.auth import authenticate
from django.views.decorators.csrf import csrf_exempt
# LOCAL.
from .models import User
from .serializers import UserSerializer
from diet.models import NutritionData

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
        user.nutrition_data = NutritionData()
        user.save()
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
            'error': 'There was an error {e}',
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(('GET',))
@permission_classes([AllowAny])
def get_user_nutrition_goals(request):
    user = request.user
    if user.nutrition_goals is None:
        user.nutrition_goals = NutritionData()
        user.save()
        
    return JsonResponse({
        "nutritionGoals": {'budget': user.budget, **user.nutrition_goals.nutrients_in_json()}
    })


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
