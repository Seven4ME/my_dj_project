from django.http import HttpResponse

def homepage(request):
    return HttpResponse('<h1>Hello,world</h1>')