from .models import User
from rest_framework import serializers

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "name", "last_name", "password"]
        extra_kwargs = {"password": {"write_only": True}}
        
    def create(self, validated_data):
        """Called in POST requests."""
        user = User.objects.create_user(**validated_data) # Django’s built-in create_user() method, which handles hashing the password and ensuring the user is properly created.
        return user
