from django.contrib import admin
from . import models
# Register your models here.
class DietDayMealFoodInline(admin.TabularInline):
    model = models.DietDayMealFood
    extra = 0 # Number of empty forms for adding new instances


class DietDayMealInline(admin.TabularInline):
    model = models.DietDayMeal
    extra = 0  # Number of empty forms for adding new instances
    inlines = [DietDayMealFoodInline]  # Add nested inlines


class DietDayInline(admin.TabularInline):
    model = models.DietDay
    extra = 0  # Number of empty forms for adding new instances
    inlines = [DietDayMealInline]  # Add nested inlines


class AdminDietPlan(admin.ModelAdmin):
    list_display = ['name', 'creator', 'budget', 'n_days']
    inlines = [DietDayInline]
    
    
admin.site.register(models.FoodProduct)
admin.site.register(models.DietPlan, AdminDietPlan)
admin.site.register(models.DietDay)