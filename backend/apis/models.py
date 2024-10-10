from django.db import models
from django.contrib.auth.models import User  # Import default User model

class Data(models.Model):
    name = models.CharField(max_length=200)
    description = models.CharField(max_length=500)

class Chats(models.Model):
    chat_id = models.AutoField(primary_key=True)
    # Use Django's built-in User model for user refereacnce
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    timestamp = models.DateTimeField(auto_now_add=True)
    chat_title = models.TextField()

    def __str__(self):
        return f"Chat {self.chat_id} by {self.user.username}"  # Use 'user.username' for display

class ChatHistory(models.Model):
    prompt_id = models.AutoField(primary_key=True)
    chat = models.ForeignKey(Chats, on_delete=models.CASCADE, related_name='history')
    prompt = models.TextField()
    answer = models.TextField()

    def __str__(self):
        return f"Prompt {self.prompt_id} for Chat {self.chat.chat_id}"
