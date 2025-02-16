from django.shortcuts import render, get_object_or_404
from project.settings import USDA_API_KEY
from django.http import JsonResponse

from accounts.models import User
from diet.models import FoodProduct, NutritionData, DietPlan, DietDay, DietDayMeal, DietDayMealFood

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework import status
from rest_framework.response import Response

import requests
import json


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_diet_plan(request, id):
    """Returns the datastructure corresponding to a dietplan."""
    user = request.user
    diet_plan = get_object_or_404(DietPlan, uuid=id, creator=user)
   
    days = [] # Days and meals and foods.
    for day in diet_plan.days.all():
        d = {'meals': []}
        for meal in sorted(day.meals.all(), key=lambda m: m.number):
            d['meals'].append(meal.get_meal_as_json())
        days.append(d)
        
    res = {
        'id': diet_plan.uuid,
        'dietPlanName': diet_plan.name,
        'budget': diet_plan.budget,
        'days': days,
        'nutrientTargets': diet_plan.nutrient_targets.nutrients_in_json() if diet_plan.nutrient_targets else None,
    }
    
    return Response(res, status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_diet_plans(request):
    """Returns all the diet plans a user has"""
    user = request.user
    res = [diet.get_diet_plan_as_json() for diet in sorted(user.diets.all(), key=lambda d: d.updated_at, reverse=True)]
    return Response({
        'dietPlans': res
    }, status=status.HTTP_200_OK)


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_diet_plan(request, id):
    """Deletes a diet plan"""
    diet_plan = get_object_or_404(DietPlan, uuid=id, creator=request.user)
    diet_plan.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(['POST', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def save_diet_plan(request):
    """
    Saves a diet plan.

    Request Body:
    {
        "name": "diet plan name",
        "budget": float,  # diet plan budget
        "nutrientTargets": {"energy": 2000, ...},
        "days": [
            {
                "meals": [
                    {
                        "name": "meal name",
                        "foods": [
                            {"id": int, "servings": float, "servingMeasureInGrams": float}, ...
                        ]
                    }, ...
                ]
            }, ...
        ]
    }

    Response:
    - 201: Diet plan saved successfully.
    - 400: Invalid request data.
    """
    user = request.user

    try:
        data = json.loads(request.body)
    except json.JSONDecodeError:
        return Response({'error': 'Request body must be valid JSON.'}, status=status.HTTP_400_BAD_REQUEST)
    
    name = data.get('name')
    days = data.get('days')
    
    try:
        budget = float(data.get('budget', 0))
    except ValueError:
        return Response({'error': 'budget must be a number'}, status=status.HTTP_400_BAD_REQUEST)
    
    nutrient_targets_data = data.get('nutrientTargets')

    if not name:
        return Response({'error': 'Diet plan name is required.'}, status=status.HTTP_400_BAD_REQUEST)
    if not days or not isinstance(days, list):
        return Response({'error': 'A diet plan must include a non-empty list of days.'}, status=status.HTTP_400_BAD_REQUEST)
    if len(days) > 7:
        return Response({'error': 'A diet plan can have at most 7 days.'}, status=status.HTTP_400_BAD_REQUEST)
    if not nutrient_targets_data:
        return Response({'error': 'Nutrient targets are required.'}, status=status.HTTP_400_BAD_REQUEST)
    
    nutrient_targets_data = NutritionData.camel_case_to_model_fields(data=nutrient_targets_data)
    nutrient_targets = NutritionData.objects.create(**nutrient_targets_data)
    
    if request.method == 'POST':
        diet = DietPlan.objects.create(
            name=name,
            creator=user,
            budget=budget,
            nutrient_targets=nutrient_targets
        )
    elif request.method == 'PUT':
        id = data.get('id')
        if not id:
            return Response({'error': 'An Id referencing to the diet plan to be updated needs to be provided as the parameter "id"'}, status=status.HTTP_400_BAD_REQUEST)
        diet = get_object_or_404(DietPlan, uuid=id, creator=request.user)
        # Delete all associated days in a single query for efficiency.
        diet.days.all().delete()

        # Update the diet plan details.
        diet.name = name
        diet.budget = budget
        diet.nutrient_targets = nutrient_targets
        diet.save()

    # Bulk creation for days, meals, and foods
    diet_days = []
    meals_to_create = []
    foods_to_create = []

    for day_number, day_data in enumerate(days):
        meals = day_data.get('meals', [])
        if not isinstance(meals, list):
            continue

        day = DietDay(diet=diet, number=day_number)
        diet_days.append(day)

        for meal_number, meal_data in enumerate(meals):
            meal_name = meal_data.get('name', '')
            foods = meal_data.get('foods', [])
            if not isinstance(foods, list):
                continue

            meal = DietDayMeal(name=meal_name, number=meal_number, day=day)
            meals_to_create.append(meal)

            for food_number, food_data in enumerate(foods):
                food_id = food_data.get('id')
                servings = food_data.get('servings')
                serving_measure_in_grams = food_data.get('servingMeasureInGrams')

                if not all([food_id, servings, serving_measure_in_grams]):
                    continue

                foods_to_create.append(DietDayMealFood(
                    diet_day_meal=meal,
                    food_product_id=food_id,
                    servings=servings,
                    serving_measure_in_grams=serving_measure_in_grams,
                    number=food_number
                ))

    # Save all days, meals, and foods in bulk
    DietDay.objects.bulk_create(diet_days)
    DietDayMeal.objects.bulk_create(meals_to_create)
    DietDayMealFood.objects.bulk_create(foods_to_create)

    return Response({
        'success': 'Diet plan saved successfully.',
        'id': diet.uuid
    }, status=status.HTTP_201_CREATED)
