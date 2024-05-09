from django.contrib import admin
from .models import *
from allauth.socialaccount.models import SocialAccount
from django.contrib.sessions.models import Session
admin.site.register(Profile)
admin.site.register(Message)
admin.site.register(Replay)
admin.site.register(Privicy)
admin.site.register(Session)
admin.site.register(Like)
admin.site.register(SocialAcountUrls)




# Register your models here.
