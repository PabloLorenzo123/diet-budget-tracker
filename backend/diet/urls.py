from django.urls import path
from . import views

urlpatterns = [
    # GET
    path('search_foods/', views.search_foods, name="search_foods"),
    path('search_food/', views.search_food, name="search_food"),
    path('food_products/', views.food_products_list, name="food_products_list"),
    path('food_products/search/', views.search_food_products, name="search_food_products"),
    path('diet-plans/', views.get_diet_plans, name="get_diet_plans"),
    path('diet-plan/<uuid:id>/', views.get_diet_plan, name="get_diet_plan"),
    # POST & PUT.
    path('save_food/', views.save_food_product, name="save_food_product"),
    path('save-diet-plan/', views.save_diet_plan, name="save_diet_plan"),
    # DELETE.
    path('food_product/<uuid:id>/', views.food_product, name="food_product"),
]
