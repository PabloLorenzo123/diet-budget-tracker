from django.shortcuts import render
from project.settings import USDA_API_KEY
from django.http import JsonResponse

from accounts.models import User
from diet.models import FoodProduct, NutritionData

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework import status
from rest_framework.response import Response

from project import settings

import requests
import json

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
    
    #try:
    food_product_data = {
        'user': user,
        'name': name,
        'product_link': data.get("productLink"),
        'img_url': data.get("imgUrl"),
        'price': float(price),
        'servings': float(data.get("servings", 1.0)),
        'serving_measure': data.get("measure", settings.DEFAULT_SERVING_MEASURE),
        'serving_size': data.get("gramWeight", None)
    }
    
    nutrition_data = NutritionData.camel_case_to_model_fields(data)
    
    try:
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
        print(e)
        # print(json.dumps(food_product_data, indent=2))
        return Response({"error": f"An unexpectederror occurred. {e}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(('GET',))
@permission_classes([IsAuthenticated])
def food_products_list(request):
    """Returns the food products created by a user."""
    user = request.user
    food_products = user.food_products.all()
    
    res = [f.in_json() for f in food_products]
    
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
        

@api_view(('GET',))
@permission_classes([IsAuthenticated])
def search_food_products(request):
    """Returns a list of food that match a search query."""
    user = request.user
    search_q = request.GET.get('q')
    if not search_q:
        return JsonResponse({'error': 'A search query needs to be provided.'}, status=status.HTTP_400_BAD_REQUEST)
    
    food_products = user.food_products.filter(name__icontains=search_q).all()
    
    return JsonResponse({
        'foods': [f.in_json() for f in food_products]
    }, status=status.HTTP_200_OK)
