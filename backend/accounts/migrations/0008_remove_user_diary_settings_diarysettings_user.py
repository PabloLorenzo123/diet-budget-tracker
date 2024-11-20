# Generated by Django 5.1.2 on 2024-11-19 19:05

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0007_rename_dairy_settings_user_diary_settings'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='user',
            name='diary_settings',
        ),
        migrations.AddField(
            model_name='diarysettings',
            name='user',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
    ]
