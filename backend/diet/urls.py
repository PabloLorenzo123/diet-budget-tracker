from django.urls import path
from . import views

urlpatterns = [
    path('search_foods/', views.search_foods, name="search_foods"),
]
