from django.db import models
from accounts.models import User

# Create your models here.

class FoodProduct(models.Model):
    """A Food Product from a supermarket's catalog."""
    name = models.CharField(max_length=300) # For instance PACO FISH SARDINES IN WATER.
    img_url = models.URLField()
    url = models.URLField() # The supermarkets website url of the product.
    price = models.DecimalField(decimal_places=2) # In USD.
    servings = models.IntegerField(default=1)
    serving_size = models.IntegerField()
    serving_unit = models.CharField(max_length=4) # Ex: g, ml, cups, etc.
    
    author = models.ForeignKey(to=User, on_delete=models.SET_NULL, null=True, blank=True)
    # Nutrition Label. Maybe a verified field too.
    
class DietPlan(models.Model):
    """A diet plan has at most 7 different days."""
    foodProducts = models.ManyToManyField(FoodProduct)
    budget = models.DecimalField(decimal_places=2, null=True)
    productsQuantity = models.JSONField() # ex {sardines: {servings: 20, items: 2}...}
    days = models.JSONField() # Saves each day of the diet.

