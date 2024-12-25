from django.shortcuts import render
from project.settings import USDA_API_KEY
from django.http import JsonResponse

from accounts.models import User
from diet.models import FoodProduct, NutritionData

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework import status
from rest_framework.response import Response

import requests
import json

from diet.nutrients import NUTRIENTS
# Create your views here.

@api_view(('GET',))
@permission_classes([AllowAny])
def search_foods(request):
    """Makes an API Call to the USDA API FOOD API and retrieves a list of food products (description, ingredients, id)."""
    query = request.GET.get('query')
    if not query:
        return JsonResponse({
            'error': 'query parameter missing.'
        }, status=400)
        
    branded = request.GET.get('branded').lower() == 'true'

    data_types = ['Branded', 'Foundation' , 'Survey (FNDDS)', 'SR Legacy'] # https://fdc.nal.usda.gov/data-documentation.html
    
    search_url = 'https://api.nal.usda.gov/fdc/v1/foods/search'
    
    search_params = {
        'query': query,
        'dataType': data_types if branded else ['Foundation', 'Survey (FNDDS)', 'SR Legacy'], # If the food is unbranded then exclude the branded datatype.
        'pageSize': 50,
        'pageNumber': 1,
        'sortBy': 'dataType.keyword',
        'sortOrder': 'asc',
        'api_key': USDA_API_KEY
        # The other fields are optional
    }
    foods = requests.get(url=search_url, params=search_params).json()
    
    res = []
   
    for food in foods['foods']:
        f = {
            "fdcId": food['fdcId'],
            "description": food.get('description', ''),
            "brandOwner": food.get('brandOwner', None),
            "brandName": food.get('brandName', None),
            "ingredients": food.get('ingredients', None),
            "marketCountry": food.get('marketCountry', None),
            "servingSizeUnit": 'g', # is always grams.
            "servingSize": food.get('servingSize', '100')   
        }
        #f["foodNutrients"] = {nutrients[nutrient['nutrientId']]: nutrient['value'] for nutrient in food.get('foodNutrients', []) if nutrient['nutrientId'] in nutrients}
        f["foodNutrients"] = {}
        for nutrient in food.get('foodNutrients', []):
            id = str(nutrient['nutrientId'])
            value = nutrient.get('value', 0)
            if id in NUTRIENTS and NUTRIENTS[id] not in f["foodNutrients"]: # The second condition is for 'energy'.
                f["foodNutrients"][NUTRIENTS[id]] = value
        res.append(f)
    return JsonResponse({
        'foods': res
    })


@api_view(('GET',))
@permission_classes([AllowAny])
def search_food(request):
    """Returns the details of a food using their FDCID in the USDA Database.
    Should be use for not branded foods because these don't have portionSizes included in search_foods/."""
    fdcid = request.GET.get('fdcId')
    
    if not fdcid:
        return JsonResponse({
            'error': 'fdcId missing.'
        }, status=400)
        
    foods_url = 'https://api.nal.usda.gov/fdc/v1/foods'
    foods_params = {
        'fdcIds': [fdcid],
        'format': 'full',
        'api_key': USDA_API_KEY
    }
    
    try:
        food = requests.get(url=foods_url, params=foods_params).json()[0]
    except KeyError:
        return JsonResponse({
            'error': 'food not found.'
        }, status=404)
    
    # https://api.nal.usda.gov/fdc/v1/food/748967?format=full&api_key=ajv5DZ2hmSj6yeMu1mYunKVzhq38JlJHPEQDejGJ an egg.
    res = {
        "description": food.get('description', ''),
        "brandOwner": food.get('brandOwner', None),
        "brandName": food.get('brandName', None),
        "ingredients": food.get('ingredients', None),
        "marketCountry": food.get('marketCountry', None),
        "servingSizeUnit": food.get('servingSizeUnit', 'g'),
        "servingSize": food.get('servingSize', '100')   
    }
    
    res["foodNutrients"] = {}
    for nutrient in food.get('foodNutrients', []):
        id = str(nutrient['nutrient']['id'])
        value = nutrient.get('amount', 0)
        if id in NUTRIENTS:
            res["foodNutrients"][NUTRIENTS[id]] = value
    
    res["foodPortions"] = []
    for portion in food.get('foodPortions', []):
        res["foodPortions"].append({
            'measureUnit': portion['measureUnit'].get('name', ''),
            'amount': portion.get('amount', ''),
            'gramWeight': portion.get('gramWeight', '')
        })            
    return JsonResponse(res)
