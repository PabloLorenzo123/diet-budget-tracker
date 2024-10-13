from django.shortcuts import render
# LOCAL.
from .models import User
from .serializers import UserSerializer

# REST FRAMEWORK.
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated, AllowAny

# Create your views here.
class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]