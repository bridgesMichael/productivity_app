# Generated by Django 4.2 on 2023-04-25 01:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('productivity_app', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='task',
            name='amount_of_time_worked',
            field=models.DurationField(default=0),
        ),
    ]