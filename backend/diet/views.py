from django.shortcuts import render
from project.settings import USDA_API_KEY
from django.http import JsonResponse

from accounts.models import User
from .models import FoodProduct, NutritionData

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework import status
from rest_framework.response import Response

import requests
import json

from .nutrients import NUTRIENTS
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
            if id in NUTRIENTS:
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


@api_view(('POST', 'PUT'))
@permission_classes([IsAuthenticated])
def save_food_product(request):
    """Saves a food product."""
    try:
        data = json.loads(request.body)
    except json.JSONDecodeError:
        return Response({"error": "Invalid JSON data."}, status=status.HTTP_400_BAD_REQUEST)
    
    user = request.user
    
    # Validate required fields
    
    name = data.get("productName")
    try:
        price = float(data.get("productPrice"))
        servings = float(data.get("servings"))
    except ValueError:
        print(json.dumps(data, indent=2))
        return Response({"error": "Price and servings must be numbers."}, status=status.HTTP_400_BAD_REQUEST)
    
    
    
    if name is None or price is None:
        return Response({"error": "Missing required fields: 'name' or 'price'."}, status=status.HTTP_400_BAD_REQUEST)
    
    if price < 0:
        return Response({"error": "Price cannot be negative."}, status=status.HTTP_400_BAD_REQUEST)
    
    if servings <= 0:
        return Response({"error": "Price needs to be greater than 0."}, status=status.HTTP_400_BAD_REQUEST)
    
    try:
        food_product_data = {
            'user': user,
            'name': name,
            'product_link': data.get("productLink"),
            'img_url': data.get("imgUrl"),
            'price': price,
            'servings': data.get("servings", 1),
            'serving_measure': data.get("measure", "serving"),
            'serving_size': data.get("gramWeight")
        }
        nutrition_data = {
            # nutrients.
            'energy': data.get("energy", 0.0),
            'protein': data.get("protein", 0.0),
            'fiber': data.get("fiber", 0.0),
            'starch': data.get("starch", 0.0),
            'sugars': data.get("sugars", 0.0),
            'added_sugars': data.get("addedSugars", 0.0),
            'net_carbs': data.get("netCarbs", 0.0),
            # Fats.
            'monounsaturated_fat': data.get("monounsaturatedFat", 0.0),
            'polyunsaturated_fat': data.get("polyunsaturatedFat", 0.0),
            'saturated_fat': data.get("saturatedFat", 0.0),
            'trans_fat': data.get("transFat", 0.0),
            'cholesterol': data.get("cholesterol", 0.0),
            'total_fat': data.get("totalFat", 0.0),
            # Vitamins.
            'b1': data.get("B1", 0.0),
            'b2': data.get("B2", 0.0),
            'b3': data.get("B3", 0.0),
            'b5': data.get("B5", 0.0),
            'b6': data.get("B6", 0.0),
            'b12': data.get("B12", 0.0),
            'choline': data.get("choline", 0.0),
            'folate': data.get("folate", 0.0),
            'a': data.get("A", 0.0),
            'c': data.get("C", 0.0),
            'd': data.get("D", 0.0),
            'e': data.get("E", 0.0),
            'k': data.get("K", 0.0),
            # Minerals.
            'calcium': data.get("calcium", 0.0),
            'chromium': data.get("chromium", 0.0),
            'copper': data.get("copper", 0.0),
            'iron': data.get("iron", 0.0),
            'magnesium': data.get("magnesium", 0.0),
            'manganese': data.get("manganese", 0.0),
            'molybdenum': data.get("molybdenum", 0.0),
            'phosphorus': data.get("phosphorus", 0.0),
            'potassium': data.get("potassium", 0.0),
            'selenium': data.get("selenium", 0.0),
            'sodium': data.get("sodium", 00.0),
            'zinc': data.get("zinc", 0.0)
        }
        
        if request.method == 'POST':
            food_product = FoodProduct(**food_product_data)
            fp_nutrition_data = NutritionData(**nutrition_data)
            food_product.nutrition_data = fp_nutrition_data
            fp_nutrition_data.save()
            food_product.save()
            return Response({"success": "Food product saved"}, status=status.HTTP_201_CREATED)
            
        elif request.method == 'PUT':
            id = data.get('id')
            if not id:
                return JsonResponse({'error': 'Id was not provided'}, status=status.HTTP_400_BAD_REQUEST)
            food_product = FoodProduct.objects.filter(user=user, id=id)
            if food_product.exists(): # We can assume nutrition data also exists.
                food_product = food_product.first()
                fp_nutrition_data = food_product.nutrition_data
                # Update food_product fields.
                for field, value in food_product_data.items():
                    if hasattr(food_product, field):
                        setattr(food_product, field, value)
                # Update nutritional_data fields.
                for field, value in nutrition_data.items():
                    if hasattr(fp_nutrition_data, field):
                        setattr(fp_nutrition_data, field, value) 
                fp_nutrition_data.save()
                food_product.save()
                return Response({"success": "Food product saved"}, status=status.HTTP_201_CREATED)   
            else:
                return JsonResponse({'error': 'Food product not found'}, status=status.HTTP_404_NOT_FOUND)
    
    except Exception as e:
        return Response({"error": f"An unexpected error occurred. {e}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    

@api_view(('GET',))
@permission_classes([IsAuthenticated])
def food_products_list(request):
    """Returns the food products created by a user."""
    user = request.user
    food_products = FoodProduct.objects.filter(user=user).all()
    
    res = []
    
    for f in food_products:
        res.append({
            'id': f.id,
            'foodData': {
                'productName': f.name,
                'productLink': f.product_link,
                'servings': f.servings,
                'measure': f.serving_measure,
                'gramWeight': float(f.serving_size),
                'productPrice': f.price,
            },
            'nutritionData': f.nutrition_data.nutrients_in_json()
        })
    
    return JsonResponse({
        'foods': res
    }, status=status.HTTP_200_OK)
    

@api_view(('DELETE',))
@permission_classes([IsAuthenticated])
def food_product(request, id):
    """Deletes a food product."""
    user = request.user
    
    if not id:
        return JsonResponse({'error': 'Id was not provided'}, status=status.HTTP_400_BAD_REQUEST)
    
    food_product = FoodProduct.objects.filter(user=user, id=id)
    if request.method == 'DELETE':
        if food_product.exists():
            food_product = food_product.first()
            food_product.delete()
            return JsonResponse({'success': 'Food product deleted.'}, status=status.HTTP_200_OK)
        else:
            return JsonResponse({'error': 'Food product not found'}, status=status.HTTP_404_NOT_FOUND)
