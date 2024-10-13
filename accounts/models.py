from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.

class User(AbstractUser):
    name = models.CharField(max_length=20)
    last_name = models.CharField(max_length=20)
    
    # Maybe add BMI, calories, etc.
