from django.shortcuts import render
from project.settings import USDA_API_KEY
from django.http import JsonResponse

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny

import requests
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
    url = 'https://api.nal.usda.gov/fdc/v1/foods/search'
    params = {
        'query': query,
        'dataType': ['Branded', 'Foundation' , 'Survey (FNDDS)', 'SR Legacy'],
        'pageSize': 25,
        'pageNumber': 1,
        'api_key': USDA_API_KEY
        # The other fields are optional
    }
    
    foods = requests.get(url=url, params=params).json()
    print(foods)
    return JsonResponse({
        'foods': foods
    })
        
