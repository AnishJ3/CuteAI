from rest_framework import serializers
from .models import Data,ChatHistory, Chats

class DataSerializer(serializers.ModelSerializer):

    class Meta:
        model=Data
        fields=('name','description')


class ChatHistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = ChatHistory
        fields = ['prompt_id', 'chat', 'prompt', 'answer']


class ChatsSerializer(serializers.ModelSerializer):

    class Meta:
        model = Chats
        fields = ['chat_id', 'user', 'timestamp', 'chat_title']
