from django.db import models
from django.contrib.auth.models import AbstractUser

from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.exceptions import InvalidToken
from rest_framework.exceptions import AuthenticationFailed

from project.settings import DIARY_SETTINGS_MAX_N_MEALS

from diet.models import NutritionData

# Create your models here.

class User(AbstractUser):
    
    def get_or_create_diary_settings(self):
        try:
            # Try accessing the user's diary settings
            user_diary_settings = self.diary_settings
            if not user_diary_settings.nutrient_targets:
                user_diary_settings.nutrient_targets = NutritionData.create_object_rdi()
                user_diary_settings.save()  # Save updates to nutrient targets
        except DiarySettings.DoesNotExist:
            # Create a new DiarySettings and associate it with the user
            user_diary_settings = DiarySettings(
                user=self,  # Associate the new settings with the user
                nutrient_targets=NutritionData.create_object_rdi()
            )
            user_diary_settings.save()
        finally:
            return self.diary_settings  
    

class DiarySettings(models.Model):
    """Sets the default dairy settings of an user."""
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="diary_settings", null=True)
    budget = models.FloatField(default=0.0) # Daily.
    nutrient_targets = models.OneToOneField('diet.NutritionData', on_delete=models.CASCADE, related_name="user", null=True, blank=True) # Daily.
    # Meals.
    # Nutrient targets.


class Meal(models.Model):
    """A meal"""
    diary_settings = models.ForeignKey(DiarySettings, on_delete=models.CASCADE, related_name='meals')
    name = models.CharField(max_length=20, null=True)
    order = models.PositiveIntegerField()  # To define meal order
    hide_from_diary = models.BooleanField(default=False)
    
    def to_json(self):
        return {
            'name': self.name,
            'order': int(self.order),
            'hideFromDiary': self.hide_from_diary if self.name else True
        }
