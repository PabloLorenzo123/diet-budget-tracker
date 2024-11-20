from django.urls import path
from . import views
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path("signup/", views.sign_up, name="reqister"),
    path("login/", views.login, name='login'),
    path("token/", TokenObtainPairView.as_view(), name="get_token"),   # LOGIN.
    path("token/refresh/", TokenRefreshView.as_view(), name="refresh"), # Expired Login.
    # Diary settings.
    path('diary_settings/', views.get_user_diary_settings, name="get_user_diary_settings"),
    path('diary_settings/daily_targets/', views.user_nutrition_goals, name='get_user'),
    path('diary_settings/meals/', views.meals_diary_settings, name='save_meal_settings'),
]
