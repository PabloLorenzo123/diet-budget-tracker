from django.contrib import admin
from . import models

# Inline for Food products within a Meal
class DietDayMealFoodInline(admin.TabularInline):
    model = models.DietDayMealFood
    extra = 0  # No empty forms for new instances
    fields = ['food_product', 'servings', 'serving_measure_in_grams']  # Display specific fields

# Inline for Meals within a Diet Day
class DietDayMealInline(admin.TabularInline):
    model = models.DietDayMeal
    extra = 0  # No empty forms for new instances
    inlines = [DietDayMealFoodInline]  # Add nested inlines
    list_display = ['name', 'number']  # Display the meal's name and number
    fields = ['name', 'number']  # Specify fields to display

# Inline for Diet Days within a Diet Plan
class DietDayInline(admin.TabularInline):
    model = models.DietDay
    extra = 0  # No empty forms for new instances
    inlines = [DietDayMealInline]  # Add nested inlines
    list_display = ['number']  # Display the day number
    fields = ['number']  # Specify fields to display

# Main DietPlan Admin configuration
class AdminDietPlan(admin.ModelAdmin):
    list_display = ['name', 'creator', 'budget', 'n_days']
    inlines = [DietDayInline]  # Include inlines for Diet Days

    def n_days(self, obj):
        # Return the number of days in the DietPlan
        return obj.days.count()
    n_days.admin_order_field = 'days'  # Allow sorting by the number of days

# Register models
admin.site.register(models.FoodProduct)
admin.site.register(models.NutritionData)
admin.site.register(models.DietPlan, AdminDietPlan)
admin.site.register(models.DietDay)
admin.site.register(models.DietDayMeal)
