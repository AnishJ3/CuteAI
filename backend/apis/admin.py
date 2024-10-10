from django.contrib import admin

from .models import Data
from .models import User
from .models import Chats
from .models import ChatHistory

# Register your models here.
admin.site.register(Data)

# admin.site.register(User)

admin.site.register(Chats)
admin.site.register(ChatHistory)