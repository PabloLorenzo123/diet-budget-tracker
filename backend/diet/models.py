import uuid

from project.settings import RDI
from django.db import models

# Create your models here.
class NutritionData(models.Model):
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
    cholestherol = models.DecimalField(max_digits=10, decimal_places=2, default=0)
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
    
    @staticmethod
    def create_object_rdi() -> models.Model:
        """Creates a NutritionData object with its fields set to the recommended daily intake."""
        nd = NutritionData(**RDI)
        nd.save()
        return nd
    
    def nutrients_in_json(self) -> dict:
        """Returns a dictionary with all the nutrients."""
        return {
            "energy": float(self.energy),
            "protein": float(self.protein),
            "fiber": float(self.fiber),
            "starch": float(self.starch),
            "sugars": float(self.sugars),
            "addedSugars": float(self.added_sugars),
            "netCarbs": float(self.net_carbs),
            "monounsaturatedFat": float(self.monounsaturated_fat),
            "polyunsaturatedFat": float(self.polyunsaturated_fat),
            "saturatedFat": float(self.saturated_fat),
            "transFat": float(self.trans_fat),
            "cholestherol": float(self.cholestherol),
            "totalFat": float(self.total_fat),
            "B1": float(self.b1),
            "B2": float(self.b2),
            "B3": float(self.b3),
            "B5": float(self.b5),
            "B6": float(self.b6),
            "B12": float(self.b12),
            "choline": float(self.choline),
            "folate": float(self.folate),
            "A": float(self.a),
            "C": float(self.c),
            "D": float(self.d),
            "E": float(self.e),
            "K": float(self.k),
            "calcium": float(self.calcium),
            "chromium": float(self.chromium),
            "copper": float(self.copper),
            "iron": float(self.iron),
            "magnesium": float(self.magnesium),
            "manganese": float(self.manganese),
            "molybdenum": float(self.molybdenum),
            "phosphorus": float(self.phosphorus),
            "potassium": float(self.potassium),
            "selenium": float(self.selenium),
            "sodium": float(self.sodium),
            "zinc": float(self.zinc)
        }


class FoodProduct(models.Model):
    """A Food Product from a supermarket's catalog."""
    id = models.UUIDField(primary_key=True, default=uuid.uuid4)
    user = models.ForeignKey('accounts.User', on_delete=models.SET_NULL, null=True, blank=True)
    
    name = models.CharField(max_length=300) # For instance PACO FISH SARDINES IN WATER.
    product_link = models.URLField(null=True)
    img_url = models.URLField(null=True)
    price = models.DecimalField(max_digits=5, decimal_places=2, default=0) # In USD.
    servings = models.IntegerField(default=1)
    serving_measure = models.CharField(max_length=20, default="serving") # Serving, an egg, a tablespoon, etc.
    serving_size = models.DecimalField(max_digits=5, decimal_places=2, null=True) # Serving size is always in grams.
    
    nutrition_data = models.OneToOneField(NutritionData, on_delete=models.CASCADE, related_name='food_product', null=False)
    
    def __str__(self) -> str:
        return f"{self.name}"

    
class DietPlan(models.Model):
    """A diet plan has at most 7 different days."""
    foodProducts = models.ManyToManyField(FoodProduct)
    budget = models.DecimalField(max_digits=5, decimal_places=2, null=True)
    productsQuantity = models.JSONField() # ex {sardines: {servings: 20, items: 2}...}
    days = models.JSONField() # Saves each day of the diet.

