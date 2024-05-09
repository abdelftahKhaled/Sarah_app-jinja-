from django.urls import path,re_path
from . import views
urlpatterns = [
    path('',views.index,name='index'),
    path('setting',views.setting,name='setting'),
    path('search',views.search,name='search'),
    path('help',views.help,name='help'),
    path('contact_us',views.contact_us,name='contact_us'),
    path('Terms',views.help,name='Terms'),
    path('Privacy',views.help,name='Privacy'),
    path('profile/<slug:slug>/', views.profile_detail_view, name='profile_detail'),
    path('messages',views.messages,name='messages'),
    path('my_messages',views.my_messages,name='my_messages'),
    path('my_send',views.my_send,name='my_send'),
    path('fav',views.fav,name='set_fav'),
    path('unsent',views.unsent,name='unsent'),
    path('show',views.show,name='show'),
    path('change_privecy',views.change_privecy,name='change_privecy'),
    
    path('hiden',views.hiden,name='hiden'),
    path('delete_replay',views.delete_replay,name='delete_replay'),
    path('replay/<uuid:id>/',views.replay,name='replay'),
    path('edit_replay/<uuid:id>/',views.edit_replay,name='edit_replay'),
    path('delete_replay',views.delete_replay,name='delete_replay'),
    
    path('socialAcount',views.socialAcount,name='socialAcount'),
    re_path('like_message/',views.like,name='like_message'),
    path('ajax/messages/set_fav/', views.set_fav, name='set_fav'),
]