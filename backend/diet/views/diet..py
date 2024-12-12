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

@api_view(('POST',))
@permission_classes([IsAuthenticated])
def save_diet_plan(request):
    """Saves a diet plan.
    Request body: {
        name: 'diet plan name',
        budget: diet plan bugdet: float,
        nutrientsTarget: {energy: 2000...},
        days: [
            {
                meals: [ {
                    'name': 'meal name',
                    'foods': [{'id', 'servings' 'serving_measure_in_grams'}...]
                    } 
            }...
        ]
    }"""
    
    user = request.user
    try:
        data = json.loads(request.body)
    except json.JSONDecodeError:
        return Response({'error': 'Request body must be a json'}, status=status.HTTP_400_BAD_REQUEST)
    
    name = data.get('name')
    days = data.get('days')
    budget = data.get('budget', 0)
    nutrient_targets = data.get('nutrientTargets')
    
    if not days:
        return Response({
            'error': "won't save an empty diet plan",
       }, status=status.HTTP_400_BAD_REQUEST)
    if days > 7:
        return Response({
            'error': 'A diet plan can have at most 7 days.'
        }, status=status.HTTP_400_BAD_REQUEST)
    
    nutrient_targets = NutritionData.objects.create(**nutrient_targets)
    
    diet = DietPlan.objects.create(
        name=name,
        creator=user,
        budget=budget,
        nutrient_targets=nutrient_targets
    )
    
    for n, d in enumerate(days, start=1):
        meals = d.get('meals')
        if not meals:
            continue
        
        day = DietDay.objects.create(
            diet=diet,
            number=n
        )
             
        for n,m in enumerate(meals, start=1):
            m_name = m.get('name')
            
            meal = DietDayMeal.objects.create(
                name=m_name,
                number=n,
                day=day
            )
            
            foods = m.get('foods')
            
            for f in foods:
                food_p_id = f.get('id')
                food_p_servings = float(f.get('servings'))
                food_p_sm_in_grams = float(f.get('servingMeasureInGrams'))
                if not food_p_id or not food_p_servings or not food_p_sm_in_grams:
                    continue
                try:
                    food_product = FoodProduct.objects.get(id=food_p_id)
                except FoodProduct.DoesNotExist:
                    continue
                food = DietDayMealFood.objects.create(
                    diet_day_meal=meal,
                    food_product=food_product,
                    servings=food_p_servings,
                    serving_measure_in_grams=food_p_sm_in_grams
                )
    
    return Response({'success': 'Diet plan saved'}, status=status.HTTP_201_CREATED)
