from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Note

# UserSerializer: This class is used to serialize the User model.
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'password']
        # The password field should be write-only, and it should be required
        extra_kwargs = {'password': {'write_only': True, 'required': True}}
        
    # create: This method is used to create a new user.
    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user
    
class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = ['id', 'title', 'content', 'created_at', 'author']
        extra_qwargs = {'author': {'read_only': True}}