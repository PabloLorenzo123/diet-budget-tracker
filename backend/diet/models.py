import uuid

from django.db import models
from accounts.models import User

# Create your models here.

class FoodProduct(models.Model):
    """A Food Product from a supermarket's catalog."""
    id = models.UUIDField(primary_key=True, default=uuid.uuid4)
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
    
    def __str__(self) -> str:
        return f"{self.name}"
    
    def nutrients_in_json(self) -> dict:
        """Returns a dictionary with all the nutrients."""
        return {
            "energy": self.energy,
            "protein": self.protein,
            "fiber": self.fiber,
            "starch": self.starch,
            "sugars": self.sugars,
            "addedSugars": self.added_sugars,
            "netCarbs": self.net_carbs,
            "monounsaturatedFat": self.monounsaturated_fat,
            "polyunsaturatedFat": self.polyunsaturated_fat,
            "saturatedFat": self.saturated_fat,
            "transFat": self.trans_fat,
            "cholestherol": self.cholesterol,
            "totalFat": self.total_fat,
            "B1": self.b1,
            "B2": self.b2,
            "B3": self.b3,
            "B5": self.b5,
            "B6": self.b6,
            "B12": self.b12,
            "choline": self.choline,
            "folate": self.folate,
            "A": self.a,
            "C": self.c,
            "D": self.d,
            "E": self.e,
            "K": self.k,
            "calcium": self.calcium,
            "chromium": self.chromium,
            "copper": self.copper,
            "iron": self.iron,
            "magnesium": self.magnesium,
            "manganese": self.manganese,
            "molybdenum": self.molybdenum,
            "phosphorus": self.phosphorus,
            "potassium": self.potassium,
            "selenium": self.selenium,
            "sodium": self.sodium,
            "zinc": self.zinc
        }
    
class DietPlan(models.Model):
    """A diet plan has at most 7 different days."""
    foodProducts = models.ManyToManyField(FoodProduct)
    budget = models.DecimalField(max_digits=5, decimal_places=2, null=True)
    productsQuantity = models.JSONField() # ex {sardines: {servings: 20, items: 2}...}
    days = models.JSONField() # Saves each day of the diet.

