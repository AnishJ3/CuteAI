from django.urls import path
from .views import (
    GetDataView, PostDataView, GetChatHistoryView, NewChatHistoryView,
    GetChatsView, NewChatView, ChangeTitleView, CreateUserView, LoginView,
    LogoutView, GetCsrfToken, SessionView, WhoAmIView,Signup,DeleteChat
)

urlpatterns = [
    path('', GetDataView.as_view(), name='get-data'),
    path('post/', PostDataView.as_view(), name='post-data'),
    path('getChatHistory/', GetChatHistoryView.as_view(), name='get-chat-history'),
    path('newChatHistory/', NewChatHistoryView.as_view(), name='new-chat-history'),
    path('getChats/', GetChatsView.as_view(), name='get-chats'),
    path('newChat/', NewChatView.as_view(), name='new-chat'),
    path('changeTitle/', ChangeTitleView.as_view(), name='change-title'),
    path('createUser/', CreateUserView.as_view(), name='create-user'),
    path('login/', LoginView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('csrf/', GetCsrfToken.as_view(), name='csrf-token'),
    path('session/', SessionView.as_view(), name='session-view'),
    path('whoami/', WhoAmIView.as_view(), name='whoami-view'),
    path('signup/', Signup.as_view(), name ='signup'),
    path('deleteChats/',DeleteChat.as_view(),name='delete-chat')
]
