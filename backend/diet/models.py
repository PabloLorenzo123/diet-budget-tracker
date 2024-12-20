import uuid

from project.settings import RDI
from django.db import models

# Create your models here.
class NutritionData(models.Model):
    # Nutrients.
    energy = models.FloatField(default=0)
    protein = models.FloatField(default=0)
    
    # Carbs.
    fiber = models.FloatField(default=0)
    starch = models.FloatField(default=0)
    sugars = models.FloatField(default=0)
    added_sugars = models.FloatField(default=0)
    net_carbs = models.FloatField(default=0)
    
    # Fats.
    monounsaturated_fat = models.FloatField(default=0)
    polyunsaturated_fat = models.FloatField(default=0)
    saturated_fat = models.FloatField(default=0)
    trans_fat = models.FloatField(default=0)
    cholesterol = models.FloatField(default=0)
    total_fat = models.FloatField(default=0)
    
    # Vitamins.
    b1 = models.FloatField(default=0)
    b2 = models.FloatField(default=0)
    b3 = models.FloatField(default=0)
    b5 = models.FloatField(default=0)
    b6 = models.FloatField(default=0)
    b12 = models.FloatField(default=0)
    choline = models.FloatField(default=0)
    folate = models.FloatField(default=0)
    a = models.FloatField(default=0)
    c = models.FloatField(default=0)
    d = models.FloatField(default=0)
    e = models.FloatField(default=0)
    k = models.FloatField(default=0)
    
    # Minerals.
    calcium = models.FloatField(default=0)
    chromium = models.FloatField(default=0)
    copper = models.FloatField(default=0)
    iron = models.FloatField(default=0)
    magnesium = models.FloatField(default=0)
    manganese = models.FloatField(default=0)
    molybdenum = models.FloatField(default=0)
    phosphorus = models.FloatField(default=0)
    potassium = models.FloatField(default=0)
    selenium = models.FloatField(default=0)
    sodium = models.FloatField(default=0)
    zinc = models.FloatField(default=0)
    
    @staticmethod
    def create_object_rdi() -> models.Model:
        """Creates a NutritionData object with its fields set to the recommended daily intake."""
        nd = NutritionData(**RDI)
        nd.save()
        return nd
    
    @staticmethod
    def camel_case_to_model_fields(data) -> dict:
        """Reads a data dictionary where keys are nutrient names in camelCase format.
        It then creates and returns a new dictionary,
        mapping these nutrient names to the appropriate fields in the NutritionData object."""
        
        return {
            # nutrients.
            'energy': float(data.get("energy", 0.0)),
            'protein': float(data.get("protein", 0.0)),
            'fiber': float(data.get("fiber", 0.0)),
            'starch': float(data.get("starch", 0.0)),
            'sugars': float(data.get("sugars", 0.0)),
            'added_sugars': float(data.get("addedSugars", 0.0)),
            'net_carbs': float(data.get("netCarbs", 0.0)),
            # Fats.
            'monounsaturated_fat': float(data.get("monounsaturatedFat", 0.0)),
            'polyunsaturated_fat': float(data.get("polyunsaturatedFat", 0.0)),
            'saturated_fat': float(data.get("saturatedFat", 0.0)),
            'trans_fat': float(data.get("transFat", 0.0)),
            'cholesterol': float(data.get("cholesterol", 0.0)),
            'total_fat': float(data.get("totalFat", 0.0)),
            # Vitamins.
            'b1': float(data.get("B1", 0.0)),
            'b2': float(data.get("B2", 0.0)),
            'b3': float(data.get("B3", 0.0)),
            'b5': float(data.get("B5", 0.0)),
            'b6': float(data.get("B6", 0.0)),
            'b12': float(data.get("B12", 0.0)),
            'choline': float(data.get("choline", 0.0)),
            'folate': float(data.get("folate", 0.0)),
            'a': float(data.get("A", 0.0)),
            'c': float(data.get("C", 0.0)),
            'd': float(data.get("D", 0.0)),
            'e': float(data.get("E", 0.0)),
            'k': float(data.get("K", 0.0)),
            # Minerals.
            'calcium': float(data.get("calcium", 0.0)),
            'chromium': float(data.get("chromium", 0.0)),
            'copper': float(data.get("copper", 0.0)),
            'iron': float(data.get("iron", 0.0)),
            'magnesium': float(data.get("magnesium", 0.0)),
            'manganese': float(data.get("manganese", 0.0)),
            'molybdenum': float(data.get("molybdenum", 0.0)),
            'phosphorus': float(data.get("phosphorus", 0.0)),
            'potassium': float(data.get("potassium", 0.0)),
            'selenium': float(data.get("selenium", 0.0)),
            'sodium': float(data.get("sodium", 00.0)),
            'zinc': float(data.get("zinc", 0.0))
        }
    
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
            "cholesterol": float(self.cholesterol),
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
    user = models.ForeignKey('accounts.User', on_delete=models.SET_NULL, related_name='food_products', null=True, blank=True)
    
    name = models.CharField(max_length=300) # For instance PACO FISH SARDINES IN WATER.
    product_link = models.URLField(null=True)
    img_url = models.URLField(null=True)
    price = models.FloatField(default=0) # In USD.
    servings = models.FloatField(default=1)
    serving_measure = models.CharField(max_length=20, default="serving") # Serving, an egg, a tablespoon, etc.
    serving_size = models.DecimalField(max_digits=5, decimal_places=2, null=True) # Serving size is always in grams.
    
    nutrition_data = models.OneToOneField(NutritionData, on_delete=models.CASCADE, related_name='food_product', null=False)
    
    def in_json(self) -> dict:
        """Returns the food product details in the format {id, foodData, nutritionData}."""
        return {
            'id': self.id,
            'foodData': {
                'productName': self.name,
                'productLink': self.product_link,
                'servings': float(self.servings),
                'measure': self.serving_measure,
                'gramWeight': self.serving_size,
                'productPrice': float(self.price),
            },
            'nutritionData': self.nutrition_data.nutrients_in_json()
        }
        
    def __str__(self) -> str:
        return f"{self.name}"

    
class DietPlan(models.Model):
    """A diet plan has at most 7 different days."""
    id = models.UUIDField(primary_key=True, default=uuid.uuid4)
    created_at = models.DateTimeField(auto_now_add=True)  # Timestamp for when the record was created
    updated_at = models.DateTimeField(auto_now=True)  # Timestamp for the last update
    
    name = models.CharField(max_length=50, null=True)
    creator = models.ForeignKey('accounts.user', on_delete=models.CASCADE, related_name='diets')
    budget = models.FloatField(null=True)
    nutrient_targets = models.ForeignKey(NutritionData, on_delete=models.SET_NULL, null=True)
    
    def __str__(self):
        return f"Diet {self.name} by {self.creator} {self.budget}$"
    
    def n_days(self) -> int:
        return len(self.days.all())
    
    def get_diet_plan_as_json(self) -> dict:
        return {
            'id': self.id,
            'name': self.name,
            'protein': self.nutrient_targets.protein,
            'netCarbs': self.nutrient_targets.net_carbs,
            'totalFat': self.nutrient_targets.total_fat,
            'date': max(self.created_at, self.updated_at).strftime('%Y-%m-%d') if self.created_at and self.updated_at else self.created_at or self.updated_at,
            'budget': self.budget
        }

class DietDay(models.Model):
    """A Diet plan has multiple DietDays, DietDays have multiple meals and meals have multiple food products."""
    diet = models.ForeignKey(DietPlan, on_delete=models.CASCADE, related_name='days')
    number = models.IntegerField()


class DietDayMeal(models.Model):
    """A Meal have multiple food products."""
    name = models.CharField(max_length=10)
    number = models.IntegerField()
    day = models.ForeignKey(DietDay, on_delete=models.CASCADE, related_name='meals')
    
    def __str__(self):
        return f"meal {self.number} for {self.day} in {self.day.diet}"
    
    def get_meal_as_json(self) -> dict:
        return {
            'name': self.name,
            'foods': [f.get_food_as_json() for f in sorted(self.foods.all(), key=lambda f: f.number)],
        }


class DietDayMealFood(models.Model):
    """Food product in a meal"""
    diet_day_meal = models.ForeignKey(DietDayMeal, on_delete=models.CASCADE, related_name="foods")
    food_product = models.ForeignKey(FoodProduct, on_delete=models.CASCADE)
    
    servings = models.FloatField(max_length=10)
    serving_measure_in_grams = models.FloatField(max_length=10)
    
    number = models.IntegerField() # In the meal.foods array where does this food fall, what's the index?
    
    def __str__(self):
        return f"{self.food_product} {self.servings} * {self.serving_measure_in_grams} for {self.diet_day_meal.day.diet}"
    
    def get_food_as_json(self):
        return {
            **self.food_product.in_json(),
            'servings': self.servings,
            'servingMeasureInGrams': self.serving_measure_in_grams,
            'mealIdx': self.number
        }
