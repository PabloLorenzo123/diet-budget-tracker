from django.urls import path
from . import views
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path("signup/", views.sign_up, name="reqister"),
    path("login/", views.login, name='login'),
    path("token/", TokenObtainPairView.as_view(), name="get_token"),   # LOGIN.
    path("token/refresh", TokenRefreshView.as_view(), name="refresh"), # Expired Login.
    path('get_user/', views.get_user, name='get_user'),
]
