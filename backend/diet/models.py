from django.db import models
from accounts.models import User

# Create your models here.

class FoodProduct(models.Model):
    """A Food Product from a supermarket's catalog."""
    user = models.ForeignKey(to=User, on_delete=models.SET_NULL, null=True, blank=True)
    
    name = models.CharField(max_length=300) # For instance PACO FISH SARDINES IN WATER.
    product_link = models.URLField(null=True)
    img_url = models.URLField(null=True)
    price = models.DecimalField(max_digits=5, decimal_places=2, default=0) # In USD.
    servings = models.IntegerField(default=1)
    serving_measure = models.CharField(max_length=20, default="serving") # Serving, an egg, a tablespoon, etc.
    serving_size = models.DecimalField(max_digits=5, decimal_places=2, null=True) # Serving size is always in grams.
    
    # Nutrients.
    energy = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    protein = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    
    # Carbs.
    fiber = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    starch = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    sugars = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    added_sugars = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    net_carbs = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    
    # Fats.
    monounsaturated_fat = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    polyunsaturated_fat = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    saturated_fat = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    trans_fat = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    cholesterol = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    total_fat = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    
    # Vitamins.
    b1 = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    b2 = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    b3 = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    b5 = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    b6 = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    b12 = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    choline = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    folate = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    a = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    c = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    d = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    e = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    k = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    
    # Minerals.
    calcium = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    chromium = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    copper = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    iron = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    magnesium = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    manganese = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    molybdenum = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    phosphorus = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    potassium = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    selenium = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    sodium = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    zinc = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    
    
class DietPlan(models.Model):
    """A diet plan has at most 7 different days."""
    foodProducts = models.ManyToManyField(FoodProduct)
    budget = models.DecimalField(max_digits=5, decimal_places=2, null=True)
    productsQuantity = models.JSONField() # ex {sardines: {servings: 20, items: 2}...}
    days = models.JSONField() # Saves each day of the diet.

