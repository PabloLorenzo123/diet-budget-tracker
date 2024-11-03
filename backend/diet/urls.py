from django.urls import path
from . import views

urlpatterns = [
    # GET
    path('search_foods/', views.search_foods, name="search_foods"),
    path('search_food/', views.search_food, name="search_food"),
    path('food_products/', views.food_products_list, name="food_products_list"),
    # POST & PUT.
    path('save_food/', views.save_food_product, name="save_food_product"),
    # DELETE.
    path('food_product/<uuid:id>/', views.food_product, name="food_product"),
]
