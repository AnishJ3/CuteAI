from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from .models import Data, ChatHistory, Chats
from .serializers import DataSerializer, ChatHistorySerializer, ChatsSerializer
# from src.chat_ai21 import get_response_llm
from src.chat_cohere import get_response_llm
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout,tokens
from rest_framework.permissions import IsAuthenticated
from django.http import JsonResponse
from django.middleware.csrf import get_token
from rest_framework_simplejwt.exceptions import TokenError
from rest_framework_simplejwt.tokens import RefreshToken


# CSRF and Session Views
class GetCsrfToken(APIView):
    def get(self, request):
        response = JsonResponse({'detail': 'CSRF cookie set'})
        response['X-CSRFToken'] = get_token(request)
        return response


class SessionView(APIView):
    def get(self, request):
        return JsonResponse({'isAuthenticated': request.user.is_authenticated})


class WhoAmIView(APIView):
    def get(self, request):
        if not request.user.is_authenticated:
            return JsonResponse({'isAuthenticated': False})
        return JsonResponse({'username': request.user.username})


# User Authentication Views
class CreateUserView(APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        email = request.data.get('email')

        if not username or not password or not email:
            return Response({"error": "Username, password, and email are required"}, status=status.HTTP_400_BAD_REQUEST)

        if User.objects.filter(username=username).exists():
            return Response({"error": "Username already exists"}, status=status.HTTP_400_BAD_REQUEST)

        user = User.objects.create_user(username=username, password=password, email=email)
        user.save()
        return Response({"message": "User created successfully", "user_id": user.id}, status=status.HTTP_201_CREATED)
    
    
class Signup(APIView):
    def post(self, request):
        # Extract username and password from the request data
        username = request.data.get('username')
        password = request.data.get('password')

        # Check if both username and password are provided
        if not username or not password:
            return Response({"error": "Username and password are required"}, status=status.HTTP_400_BAD_REQUEST)

        # Check if the username already exists
        if User.objects.filter(username=username).exists():
            return Response({"error": "Username already taken"}, status=status.HTTP_400_BAD_REQUEST)

        # Create a new user
        user = User.objects.create_user(username=username, password=password)
        user.save()

        # Return a success response
        return Response({"message": "User registered successfully"}, status=status.HTTP_201_CREATED)

        

class LoginView(APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')

        if not username or not password:
            return Response({"error": "Username and password are required"}, status=status.HTTP_400_BAD_REQUEST)

        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return Response({"message": "Login successful", "user_id": user.id}, status=status.HTTP_200_OK)
        else:
            return Response({"error": "Invalid username or password"}, status=status.HTTP_401_UNAUTHORIZED)


# class LogoutView(APIView):
#     def post(self, request):
#         if not request.user.is_authenticated:
#             return JsonResponse({'detail': 'You\'re not logged in.'}, status=400)

#         logout(request)
#         return JsonResponse({'detail': 'Successfully logged out.'})

class LogoutView(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        try:
            refresh_token = request.data["refresh_token"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response(status=status.HTTP_205_RESET_CONTENT)
        except TokenError as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({"error": "An unexpected error occurred."}, status=status.HTTP_400_BAD_REQUEST)

# Data Views
class GetDataView(APIView):
    permission_classes = (IsAuthenticated, )

    def get(self, request):
        app = Data.objects.all()
        serializer = DataSerializer(app, many=True)
        return Response(serializer.data)


class PostDataView(APIView):
    permission_classes = (IsAuthenticated, )

    def post(self, request):
        serializer = DataSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# Chat History and Chats Views
class GetChatHistoryView(APIView):
    permission_classes = (IsAuthenticated, )

    def post(self, request):
        chat_id = request.data.get('chat_id')

        if chat_id is None:
            return Response({"error": "chat_id is required"}, status=status.HTTP_400_BAD_REQUEST)

        chat_history = ChatHistory.objects.filter(chat_id=chat_id)
        # if not chat_history.exists():
        #     return Response({"error": "No chat history found for the provided chat_id"}, status=status.HTTP_404_NOT_FOUND)

        serializer = ChatHistorySerializer(chat_history, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class NewChatHistoryView(APIView):
    permission_classes = (IsAuthenticated, )

    def post(self, request):
        user_id = request.user.id
        prompt = request.data.get("prompt")
        chat_id= request.data.get("chat_id")
        response = get_response_llm(prompt)
        print(response)
        serializer = ChatHistorySerializer(data={"prompt": prompt, "answer": response, "chat": chat_id, "user":user_id})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class GetChatsView(APIView):
    permission_classes = (IsAuthenticated, )

    def post(self, request):
        user_id = request.user.id
        
        if not user_id:
            return Response({"error": "The user_id is missing"}, status=403)

        chats = Chats.objects.filter(user_id=user_id)
        serializer = ChatsSerializer(chats, many=True)
        return Response(serializer.data, status=200)


class NewChatView(APIView):
    permission_classes = (IsAuthenticated, )

    def post(self, request):
        # user_id = request.data.get("user_id")
        user_id = request.user.id
        print(request.user)
        chat_title = "New Chat"
        serializer = ChatsSerializer(data={"user": user_id, "chat_title": chat_title})

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ChangeTitleView(APIView):
    permission_classes = (IsAuthenticated, )

    def put(self, request):
        chat_id = request.data.get("chat_id")
        chat_title = request.data.get("chat_title")
        
        if not chat_id or not chat_title:
            return Response({"error": "chat_id and chat_title are required"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            chat = Chats.objects.get(chat_id=chat_id)
            chat.chat_title = chat_title
            chat.save()
            return Response({"message": "Chat title updated successfully"}, status=status.HTTP_200_OK)
        except Chats.DoesNotExist:
            return Response({"error": "Chat not found"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        

class DeleteChat(APIView):
    permission_classes = (IsAuthenticated, )

    def delete(self, request):
        chat_ids = request.data.get("chat_ids")
        if not chat_ids:
            return Response({"error": "chat_ids are required"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            # Use filter to delete multiple chats at once
            chats = Chats.objects.filter(chat_id__in=chat_ids)
            
            if not chats.exists():
                return Response({"error": "No chats found with the provided IDs"}, status=status.HTTP_404_NOT_FOUND)

            chats.delete()
            return Response({"message": "Chats successfully deleted"}, status=status.HTTP_200_OK)

        except Chats.DoesNotExist:
            return Response({"error": "Some chats do not exist"}, status=status.HTTP_404_NOT_FOUND)

        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
