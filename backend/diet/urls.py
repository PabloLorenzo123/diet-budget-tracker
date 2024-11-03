from django.urls import path
from . import views

urlpatterns = [
    path('search_foods/', views.search_foods, name="search_foods"),
    path('search_food/', views.search_food, name="search_food"),
    path('save_food/', views.save_food_product, name="save_food_product"),
]
