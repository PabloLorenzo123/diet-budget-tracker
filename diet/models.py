from django.db import models

# Create your models here.

class FoodProduct(models.Model):
    """A Food Product from a supermarket's catalog."""
    name = models.CharField(max_length=300) # For instance PACO FISH SARDINES IN WATER.
    img_url = models.URLField()
    url = models.URLField() # The supermarkets website url of the product.
    price = models.FloatField() # In USD.
    servings = models.IntegerField(default=1)
    serving_size = models.IntegerField()
    serving_unit = models.CharField(max_length=4) # Ex: g, ml, cups, etc.
    
    
    # Nutrition Label.
    
class DietPlan(models.Model):
    """A diet plan has at most 7 different diets."""
    pass
