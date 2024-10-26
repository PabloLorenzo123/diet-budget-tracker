from django.shortcuts import render
from project.settings import USDA_API_KEY
from django.http import JsonResponse

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny

import requests
import json
# Create your views here.

@api_view(('GET',))
@permission_classes([AllowAny])
def search_foods(request):
    """Makes an API Call to the USDA API FOOD API and retrieves a list of food products (description, ingredients, id)."""
    query = request.GET.get('query')
    branded = request.GET.get('branded') or False
    
    data_types = ['Branded', 'Foundation' , 'Survey (FNDDS)', 'SR Legacy'] # https://fdc.nal.usda.gov/data-documentation.html
    
    if not query:
        return JsonResponse({
            'error': 'query parameter missing.'
        }, status=400)
    url = 'https://api.nal.usda.gov/fdc/v1/foods/search'
    params = {
        'query': query,
        'dataType': data_types if branded else ['Foundation', 'Survey (FNDSS)'], # If the food is unbranded then exclude the branded datatype.
        'pageSize': 50,
        'pageNumber': 1,
        'api_key': USDA_API_KEY
        # The other fields are optional
    }
    print(params)
    res = []
    
    foods = requests.get(url=url, params=params).json()
    
    for food in foods["foods"]:
        try:
            f = {
                "description": food["description"],
                "brandOwner": food["brandOwner"] if "brandOwner" in food else None,
                "brandName": food["brandName"] if "brandName" in food else None,
                "ingredients": food["ingredients"] if "ingredients" in food else None,
                "marketCountry": food["marketCountry"] if "marketCountry" in food else None,
                "servingSizeUnit": food["servingSizeUnit"] if "servingSizeUnit" in food else None,
                "servingSize": food["servingSize"] if "servingSize" in food else 1   
            }
        except KeyError:
            print(json.dumps(food, indent=2))
            continue
        res.append(f)
    return JsonResponse({
        'foods': res
    })
        
