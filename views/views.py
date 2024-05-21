from django.shortcuts import render
from django.shortcuts import HttpResponse
from django.shortcuts import render, get_object_or_404
from .models import *
# Create your views here.
def index(request):
    works = Work.objects.all()
    services = Service.objects.all()
    context = {
        'works': works,
        'services': services,
    }
    return render(request, 'index.html', context)

def lab(request):
    return render(request, 'lab.html')

def case_study(request, work):
    data = get_object_or_404(Work, slug=work)
    mockups = data.mockups_set.all()

    context = {
        'work': data,
        'mockups': mockups,
    }

    return render(request, 'case.html', context)

def about(request):
    return render(request, 'about.html')

def order(request):
    return render(request, 'order.html')