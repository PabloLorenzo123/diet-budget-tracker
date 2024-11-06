from django.urls import path
from . import views
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path("signup/", views.sign_up, name="reqister"),
    path("login/", views.login, name='login'),
    path("token/", TokenObtainPairView.as_view(), name="get_token"),   # LOGIN.
    path("token/refresh/", TokenRefreshView.as_view(), name="refresh"), # Expired Login.
    path('daily_targets/', views.user_nutrition_goals, name='get_user'),
]
