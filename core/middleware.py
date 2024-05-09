
from .models import Profile
import re

from django.shortcuts import get_object_or_404

class UniqueVisitorMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response
    def __call__(self, request):
                pattern = re.compile(r'^/profile/[0-9a-fA-F-]{36}/$')
                current_path=request.path
                match = pattern.match(current_path)                
                if match:                    
                    pattern = re.compile(r'/profile/([0-9a-fA-F-]{36})/')
                    id = pattern.search(current_path).group(1)

                    if 'visitor_counted' not in request.session:      
                        request.session['visitor_counted'] = True
                        request.session.save()
                        profile_object=get_object_or_404(Profile,id=id)
                        profile_object.visetor=profile_object.visetor+1
                        print(profile_object.visetor)
                        profile_object.save()
                    response = self.get_response(request)
                    return response
                else:
                      
                    response = self.get_response(request)
                    return response