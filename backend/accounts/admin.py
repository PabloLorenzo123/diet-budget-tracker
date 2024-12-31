from django.contrib import admin
from .models import User, DiarySettings
# Register your models here.

class DiarySettingsAdmin(admin.ModelAdmin):
    list_display = ['user', 'budget']

class DiarySettingsInline(admin.TabularInline):
    model = DiarySettings
    extra = 0

class UserAdmin(admin.ModelAdmin):
    model = User
    inlines = [DiarySettingsInline]

admin.site.register(User, UserAdmin)
admin.site.register(DiarySettings, DiarySettingsAdmin)
