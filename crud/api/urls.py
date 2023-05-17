from . import views
from django.urls import path
from rest_framework.views import APIView

urlpatterns = [
    path('login/', views.LoginAPIView.as_view(), name='login'),
    path('logout/', views.LogoutView.as_view(), name='logout'),
    path('register/', views.register, name='register'),
    path('friendlists/', views.FriendListViewSet.as_view()),
     path('friendlists/<int:id>/', FriendListDetail.as_view(), name='friendlist-detail'),
]