# Generated by Django 5.1.2 on 2024-12-15 15:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('diet', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='dietdaymealfood',
            name='number',
            field=models.IntegerField(default=1),
            preserve_default=False,
        ),
    ]
