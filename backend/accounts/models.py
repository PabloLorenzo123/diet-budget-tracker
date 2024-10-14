from django.db import models
from django.contrib.auth.models import AbstractUser

from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.exceptions import InvalidToken
from rest_framework.exceptions import AuthenticationFailed

# Create your models here.

class User(AbstractUser):
    pass
    
    # Maybe add BMI, calories, etc.
    
    @staticmethod
    def get_user_from_token(request) -> AbstractUser:
        """Reads the Authorization Header, validates the token
        and returns the corresponding User Object"""
        # Get the token from the request header
        auth_header = request.headers.get('Authorization', None)
        
        if auth_header is None or not auth_header.startswith('Bearer '):
            raise AuthenticationFailed("Token not provided")

        # Extract token (assuming it's a Bearer token)
        token = auth_header.split(' ')[1]
        
        try:
            # Initialize the JWTAuthentication class
            jwt_auth = JWTAuthentication()

            # Decode and validate the token
            validated_token = jwt_auth.get_validated_token(token)

            # Use the get_user() method to get the user object
            user = jwt_auth.get_user(validated_token)

            return user
        
        except InvalidToken as e:
            return AuthenticationFailed("Invalid token")
        except User.DoesNotExist:
            raise AuthenticationFailed("User not found")
