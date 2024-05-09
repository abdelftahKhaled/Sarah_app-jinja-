from django.shortcuts import render,get_object_or_404,redirect,reverse
from .models import *
from django.contrib.sites.models import Site

from .forms import *
from django.contrib.auth.decorators import login_required
import json
from django.utils import timezone 
from django.http import JsonResponse
from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
AnonymousUser=User.objects.get(username='AnonymousUser')

@csrf_exempt
@login_required
def set_fav(request):

    if request.method == 'POST':
                
                decoded_data = json.loads(request.body.decode('utf-8'))
                id=decoded_data['id']
                acthion=decoded_data['acthion']              
                print(acthion)
                message_object=get_object_or_404(Message,id=id)
                if acthion=='favorit':
                    message_object.is_favorite=True
                    message_object.save()
                    return JsonResponse({'status': 'add'})
                else:
                     message_object.is_favorite=False
                     message_object.save()
                     return JsonResponse({'status': 'remove'})               
                  

                
        
    else:
        return JsonResponse({'status': 'error', 'message': 'Invalid request method'})
@login_required
def replay(request , id):
     if request.method=="POST":
          mes_object=Message.objects.get(id=id)

          form=FormReplay(request.POST)          
          if form.is_valid():
                replay=form.save(commit=False)
                replay.message=mes_object
                replay.save()                
                return redirect('messages')
          else:

                context={'form':form}
                return render(request,'website/Replay.html',context)
     else:

            form=FormReplay()
            context={
                 'form':form,
                 'message_id':id
            }
            return render(request,'website/Replay.html',context)
@login_required
def edit_replay(request,id):
    mes_object=get_object_or_404(Message,id=id)
    instance=mes_object.replay_message
    if request.method=="POST":


          form=FormReplay(request.POST,instance=instance)          
          if form.is_valid():

                replay=form.save(commit=False)
                replay.save()                
                return redirect('messages')
          else:

                context={'form':form}
                return render(request,'website/Replay.html',context)
    else:
            
            
            form=FormReplay(instance=instance)
            context={
                 'form':form,
                 'message_id':id
            }
            return render(request,'website/Replay.html',context)
@login_required         
def show(request):
     id = request.GET.get('key')
     mes_object=get_object_or_404(Message ,id=id)
     mes_object.is_hiden=False 

     mes_object.save()
     return redirect('messages')
@login_required
def unsent(request):
     id = request.GET.get('key')
     mes_object=get_object_or_404(Message ,id=id)
     mes_object.is_delete=True
     mes_object.save()
     return redirect('messages')
@login_required
def hiden(request):
     id = request.GET.get('key')
     mes_object=get_object_or_404(Message ,id=id)
     mes_object.is_hiden=True
     mes_object.save()
     return redirect('messages')
@login_required
def delete_replay(request):
     id = request.GET.get('key')
     replay_object=Replay.objects.get(id=id)
     replay_object.delete()

     return redirect('messages')
@login_required
def like(request,):

    message_id = request.GET.get('key')
  
    message=get_object_or_404(Message,id=message_id)
    if not (request.user.is_authenticated):
         
            if 'liked_message_list'  in request.session:      
                    if message_id in request.session['liked_message_list']:
                        #remove like
                        request.session['liked_message_list'].remove(message_id) 
                        message.no_of_like=message.no_of_like-1
                    else:
                        #add like
                        
                        request.session['liked_message_list'].append(message_id)
                        message.no_of_like=message.no_of_like+1
                    request.session.save()
                    profile_detail_url = reverse('profile_detail', kwargs={'slug': profile.slug})
                    return redirect(profile_detail_url)
            else:
                    
                    #add list
                    request.session['liked_message_list'] = []
                    #add mes id
                    request.session['liked_message_list'].append(message_id)
                    message.no_of_like=message.no_of_like+1
                    request.session.save()
                    profile_detail_url = reverse('profile_detail', kwargs={'slug': profile.slug})
                    return redirect(profile_detail_url)

    else:
         profile=request.user.profile
         like_object=Like.objects.filter(profile=profile,message=message)
         if  Like.objects.filter(profile=profile,message=message).count():
                like_object.delete()
                message.no_of_like=message.no_of_like-1
                message.save()
                profile_detail_url = reverse('profile_detail', kwargs={'slug': profile.slug})
                return redirect(profile_detail_url)
         else:
             new_like=Like.objects.create(profile=profile,message=message)
             message.no_of_like=message.no_of_like+1
             new_like.save()
             message.save()

             profile_detail_url = reverse('profile_detail', kwargs={'slug': profile.slug})
             return redirect(profile_detail_url)
@login_required

def my_messages(request):
    current_site = Site.objects.get_current()
    current_domain = current_site.domain
    #messeges_of_user
    profile = Profile.objects.get(user=request.user)
    messeges_of_user=profile.profile_Recive_messages.filter(is_delete=False)
    number_of_messeges=messeges_of_user.count()
    
  
        

    context={
         'domain':current_domain,
         'messeges_of_user':messeges_of_user,
         'number_of_messeges':number_of_messeges,
    }
    return render(request,'website/my_messages.html',context)
@login_required
def my_send(request):
    current_site = Site.objects.get_current()
    current_domain = current_site.domain
    #messeges_of_user
    profile = Profile.objects.get(user=request.user)
    messeges_of_user=request.user.sent_messages.filter(is_delete=False)
    number_of_messeges=messeges_of_user.count()
    print(messeges_of_user)
  
        

    context={
         'domain':current_domain,
         'messeges_of_user':messeges_of_user,
         'number_of_messeges':number_of_messeges,
         'profile':profile
    }
    return render(request,'website/my_send.html',context)
@login_required
def fav(request):
    current_site = Site.objects.get_current()
    current_domain = current_site.domain
    #messeges_of_user
    profile = Profile.objects.get(user=request.user)
    messeges_of_user=profile.profile_Recive_messages.all()
    number_of_messeges=messeges_of_user.count()
    
  
        

    context={
         'domain':current_domain,
         'messeges_of_user':messeges_of_user,
         'number_of_messeges':number_of_messeges,

    }
    return render(request,'website/fav.html',context)

def help(request):
    
    return render(request,'website/help.html',)

def contact_us(request):
    
    return render(request,'website/contact_us.html',)
def help(request):
    
    return render(request,'website/help.html',)
def index(request):

    return render( request,'website/index.html',{})
@login_required
def setting(request):
    user=request.user
    profile=user.profile
    privicy, created=Privicy.objects.get_or_create(profile=profile)
    social, created =SocialAcountUrls.objects.get_or_create(profile=profile)
    if request.method=='POST':
         form1=UserForm(request.POST,instance=profile.user)
         form=ProfileForm(request.POST,instance=profile)
         if form.is_valid() and form1.is_valid():
             edit=form.save(commit=False)
             us=form1.save(commit=False)
             edit.save()
             us.save()
             return redirect('setting')
         else:
              
              return redirect('setting')

    else:
        return render(request,'website/setting.html',{'privecy':privicy,'social':social})
    
         

@login_required   
def change_privecy(request):
    user=request.user
    profile=Profile.objects.get(user=user)
    form=FormPrivecy()
    instance=Privicy.objects.get(profile=profile)
    if request.method=='POST':
         
         form=FormPrivecy(request.POST,instance=instance)
         
         if form.is_valid():
             edit=form.save(commit=False)
             edit.profile=profile
             edit.save()
             return redirect('setting')
         else:
             
              return render(request,'website/setting.html',{'form':form})

    else:
            return redirect('setting')
def search(request):
    current_site = Site.objects.get_current()
    current_domain = current_site.domain
    type_viwe='none'
    if request.method=='POST':
         type_viwe='search'
         try:
                # Attempt to retrieve data from POST request
                data = request.POST.get('q')
                # Process the data if it exists
                result_search=[]
                if data:
                    query=User.objects.filter(username__icontains=data)

                    for user in query:
                         result_search.append(user.profile)
                    
                    return render(request,'website/search.html',{'current_domain':current_domain,'result_search':result_search,'type_viwe':type_viwe})
         except Exception:
                   return redirect('search')

    return render(request,'website/search.html',{'type_viwe':type_viwe,})
@login_required
def messages(request):
    #current_site
    current_site = Site.objects.get_current()
    current_domain = current_site.domain
    #messeges_of_user
    profile = Profile.objects.get(user=request.user)
    messeges_of_user=profile.profile_Recive_messages.all()
    number_of_messeges=messeges_of_user.count()
    
  
        

    context={
         'domain':current_domain,
         'messeges_of_user':messeges_of_user,
         'number_of_messeges':number_of_messeges,

    }
    return render(request,'website/messages.html',context)
def profile_detail_view(request,slug):
     profile = get_object_or_404(Profile,slug=slug)

     if  request.method=='POST':

         form=FormNewMassege(request.POST,request.FILES)

         
         if form.is_valid():
             
             new_message=form.save(commit=False)
             new_message.profile=profile
             is_secrit=form.cleaned_data.get('is_secret')
             
             if request.user.is_authenticated and not is_secrit:    
                new_message.sender=request.user
             else:
                new_message.sender=AnonymousUser
             new_message.save_new_message()               
             profile_detail_url = reverse('profile_detail', kwargs={'slug': profile.slug})
             return redirect(profile_detail_url)
         else:
             
             profile_detail_url = reverse('profile_detail', kwargs={'slug': profile.slug})
             return redirect(profile_detail_url)
            

     else:
        # if 'visitor_counted' not in request.session:      
        # request.session['visitor_counted'] = True
        # request.session.save()
        count = profile.visetor
        all_message_to_user=profile.profile_Recive_messages.filter(is_hiden=False,is_delete=False)
        context={
            'profile':profile, 
             'count':count,
              'all_message_to_user':all_message_to_user,
        } 
        
        return render(request,'website/profile.html',context)
@login_required
def socialAcount(request):

     if request.method == 'POST' :
            profile=request.user.profile
            instance, created=SocialAcountUrls.objects.get_or_create(profile=profile)

            form=SocialForm(request.POST,instance=instance)
            if form.is_valid:
         
                edit=form.save(commit=False)
                edit.profile=profile
                edit.save()
                return redirect('setting')
            else: 
                 redirect('setting')
     else:
           redirect('setting')      


