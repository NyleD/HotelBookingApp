# Generated by Django 3.0.5 on 2020-04-10 22:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('hotels', '0003_auto_20200408_1356'),
    ]

    operations = [
        migrations.AddField(
            model_name='booking',
            name='rating',
            field=models.IntegerField(default=5),
        ),
        migrations.AddField(
            model_name='customer',
            name='email',
            field=models.CharField(max_length=50, null=True),
        ),
    ]
