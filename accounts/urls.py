from django.urls import path
from .views import CreateUserView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path("register/", CreateUserView.as_view(), name="reqister"),
    path("token/", TokenObtainPairView.as_view(), name="get_token"),
    path("token/refresh", TokenRefreshView.as_view(), name="refresh"),
]
