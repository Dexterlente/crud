from django.shortcuts import render
from .models import User
from rest_framework import permissions
from rest_framework.authtoken.models import Token
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from rest_framework import generics, status, serializers
from rest_framework.views import APIView
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.authtoken.views import ObtainAuthToken
from .serializers import UserSerializer, LoginSerializer, LogoutSerializer, FriendListSerializer
from .models import FriendList

# Create your views here.

class LoginAPIView(ObtainAuthToken):
    def post(self, request):
        if request.user.is_authenticated:
            return Response({'error': 'User is already authenticated.'}, status=status.HTTP_400_BAD_REQUEST)
        
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            user = serializer.validated_data['user']
            token, created = Token.objects.get_or_create(user=user)
            return Response({'token': token.key, 'success': 'Logged in successfully'})
        else:
            return Response({'error': 'Invalid login credentials'}, status=status.HTTP_401_UNAUTHORIZED)

class LogoutView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request, format=None):
        request.user.auth_token.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(["POST"])
@permission_classes([AllowAny])
def register(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        print(user)
        token = Token.objects.create(user=user)
        return Response({'message': 'Successfully registered', 'token': token.key})
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



class FriendListViewSet(generics.ListAPIView):
    queryset = FriendList.objects.all()
    serializer_class = FriendListSerializer
    permission_classes = [IsAuthenticated]

class FriendListDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = FriendList.objects.all()
    serializer_class = FriendListSerializer
    lookup_field = 'id'
    authentication_classes =  [TokenAuthentication] 

    def get_queryset(self):
        return FriendList.objects.filter(id=self.kwargs['id'])