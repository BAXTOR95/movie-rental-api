# Generated by Django 3.1.8 on 2021-04-26 14:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0002_auto_20210426_1324'),
    ]

    operations = [
        migrations.AlterField(
            model_name='likedmovie',
            name='liked',
            field=models.BooleanField(default=True),
        ),
    ]
