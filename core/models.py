from django.db import models
from django.contrib.auth.models import User
import uuid
from django.contrib.auth import get_user_model
from django.utils.text import slugify

def upload_image_messege_to(instance,filename):
    return f'message/images/{instance.profile.id}/{instance.id}'
def upload_image_profile_to(instance,filename):
    return f'profile/images/{instance.id}'
class Profile(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    bio = models.CharField(max_length=100,)
    gender=models.CharField(max_length=10,)
    visetor=models.BigIntegerField(default=0)
    image=models.ImageField(upload_to=upload_image_profile_to,null=True ,default='/media/s-48.png')
    slug = models.SlugField(unique=True, blank=True)
    date_of_create=models.DateTimeField(auto_now=True)

    def save(self, *args, **kwargs):
        if not self.slug:
           self.slug = slugify(str(self.id))
        super().save(*args, **kwargs)
    def __str__(self):
        return self.user.username

class Privicy(models.Model):
    profile=models.OneToOneField(Profile,related_name='privecy_profile',unique=True,on_delete=models.CASCADE )
    accept_photo=models.BooleanField(default=False)
    accept_any=models.BooleanField(default=False)
    accept_bad=models.BooleanField(default=False)
    accept_push=models.BooleanField(default=False)
    accept_msg=models.BooleanField(default=False)
    show_visit=models.BooleanField(default=False)
    show_seen=models.BooleanField(default=False)
    accept_search=models.BooleanField(default=False)
   
class Message(models.Model):

    bad_word_list=['a7a','5555','kosmk']
    id = models.UUIDField(primary_key=True,unique=True, default=uuid.uuid4, editable=False)
    profile=models.ForeignKey(Profile,related_name='profile_Recive_messages', on_delete=models.CASCADE)
    no_of_like=models.BigIntegerField(default=0)
    is_favorite=models.BooleanField(default=False)
    is_hiden=models.BooleanField(default=True)
    is_secret=models.BooleanField(default=False)
    is_delete=models.BooleanField(default=False)
    content=models.TextField(max_length=100)
    sender=models.ForeignKey(User,null=True,related_name='sent_messages',on_delete=models.CASCADE)
    image=models.ImageField(upload_to=upload_image_messege_to,null=True)
    seen=models.BooleanField(default=False)
    # bad_words=models.CharField(choices=bad_word_list,max_length=15,)
    date=models.DateTimeField(auto_now_add=True,)
    
    def __str__(self):
            return f'message to >{self.profile.user.username} from {self.sender.username}  |--{self.content}'
    def cheek_bad_words(self, *args, **kwargs):
         words=self.content.split()
         print(words)
         for word in self.bad_word_list:
                print(word)
                if word in words: 
                     print(word)
                     return True
                else:
                     return False                          
    def save_new_message(self, *args, **kwargs):
        if  not (self.profile.privecy_profile.accept_bad):
            if self.cheek_bad_words():
               pass
        elif not (self.profile.privecy_profile.accept_photo):
             if self.image:
                    pass
        elif not(self.profile.privecy_profile.accept_any): 
             if self.sender.username=='AnonymousUser' :
                  pass 
        elif not(self.profile.privecy_profile.accept_msg):
             pass  
        
        else:
                super().save(*args, **kwargs)


             
             
        
    
class Replay (models.Model):
    message=models.OneToOneField(Message,related_name='replay_message',unique=True,on_delete=models.CASCADE)
    content=models.TextField(max_length=100)
    is_delete=models.BooleanField(default=False)

class Like (models.Model):
     profile=models.ForeignKey(Profile,on_delete=models.CASCADE,related_name='profile_like')
     message=models.ForeignKey(Message,related_name='like_message',on_delete=models.CASCADE)
class SocialAcountUrls(models.Model):
     profile=models.ForeignKey(Profile,on_delete=models.CASCADE)
     facebook=models.URLField(null=True,blank=True)
     instagram=models.URLField(null=True,blank=True)
     twitter=models.URLField(null=True,blank=True)
     snapchat=models.URLField(null=True,blank=True)
     youtube=models.URLField(null=True,blank=True)
     wa=models.URLField(null=True,blank=True)
     tiktok=models.URLField(null=True,blank=True)
     messenger=models.URLField(null=True,blank=True)
     gmail=models.URLField(null=True,blank=True)
     website=models.URLField(null=True,blank=True)



# def is_it_has_bad_words(content):

#         bad_Words={}
#         words=content.split()
#         for word in words :
#             hash_value = 5381
#             hash_value = (hash_value * 33) + ord(word)
#             if bad_Words[hash_value]:
#                return True
#             else:
#                  False

        