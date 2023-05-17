from . import views
from django.urls import path
from rest_framework.views import APIView

urlpatterns = [
    path('login/', views.LoginAPIView.as_view(), name='login'),
    path('logout/', views.LogoutView.as_view(), name='logout'),
    path('register/', views.register, name='register'),
]