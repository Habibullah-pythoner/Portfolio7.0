from django.contrib import admin
from .models import *

# Register your models here.
class MockupsInline(admin.TabularInline):  # Or admin.StackedInline
    model = Mockups

class WorkAdmin(admin.ModelAdmin):
    inlines = [MockupsInline]

admin.site.register(Work, WorkAdmin)
admin.site.register(Service)