from django import forms
from .models import Replay,Message,Privicy,Profile,User,SocialAcountUrls

class FormNewMassege(forms.ModelForm):
    class Meta:
        model=Message
        fields= ['content','image','is_secret']

class FormReplay(forms.ModelForm):

    class Meta:
        model=Replay
        fields= ['content',]

class FormPrivecy(forms.ModelForm):
     class Meta:
            model=Privicy
            exclude=['profile']

class ProfileForm(forms.ModelForm):
          class Meta:
                model=Profile
                fields=['bio','gender',]
class UserForm(forms.ModelForm):
          class Meta:
                model=User
                fields=['username','email',]
class SocialForm(forms.ModelForm):
                 class Meta:
                    model=SocialAcountUrls
                    exclude=['profile',] 
        
        

