from django.shortcuts import render
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

@api_view(['POST'])
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
    budget = data.get('budget', 0)
    nutrient_targets_data = data.get('nutrientTargets')

    if not name:
        return Response({'error': 'Diet plan name is required.'}, status=status.HTTP_400_BAD_REQUEST)
    if not days or not isinstance(days, list):
        return Response({'error': 'A diet plan must include a non-empty list of days.'}, status=status.HTTP_400_BAD_REQUEST)
    if len(days) > 7:
        return Response({'error': 'A diet plan can have at most 7 days.'}, status=status.HTTP_400_BAD_REQUEST)
    if not nutrient_targets_data:
        return Response({'error': 'Nutrient targets are required.'}, status=status.HTTP_400_BAD_REQUEST)

    nutrient_targets = NutritionData.objects.create(**nutrient_targets_data)

    diet = DietPlan.objects.create(
        name=name,
        creator=user,
        budget=budget,
        nutrient_targets=nutrient_targets
    )

    for day_number, day_data in enumerate(days, start=1):
        meals = day_data.get('meals')
        if not meals or not isinstance(meals, list):
            continue

        day = DietDay.objects.create(diet=diet, number=day_number)

        for meal_number, meal_data in enumerate(meals, start=1):
            meal_name = meal_data.get('name')
            foods = meal_data.get('foods')
            if not foods or not isinstance(foods, list):
                continue

            meal = DietDayMeal.objects.create(
                name=meal_name,
                number=meal_number,
                day=day
            )

            for food_data in foods:
                food_id = food_data.get('id')
                servings = food_data.get('servings')
                serving_measure_in_grams = food_data.get('servingMeasureInGrams')

                if not all([food_id, servings, serving_measure_in_grams]):
                    continue

                try:
                    food_product = FoodProduct.objects.get(id=food_id)
                except FoodProduct.DoesNotExist:
                    continue

                DietDayMealFood.objects.create(
                    diet_day_meal=meal,
                    food_product=food_product,
                    servings=servings,
                    serving_measure_in_grams=serving_measure_in_grams
                )

    return Response({'success': 'Diet plan saved successfully.'}, status=status.HTTP_201_CREATED)
