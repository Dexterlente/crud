from rest_framework.serializers import ModelSerializer
from .models import User, Profile, Post
from rest_framework import serializers
from django.contrib.auth import authenticate
from django.core.exceptions import ValidationError