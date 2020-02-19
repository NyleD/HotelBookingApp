from django.db import models
from django.contrib.auth.models import User
from django.db.models import SET_NULL
from django.core.validators import MaxValueValidator, MinValueValidator

class Customer(models.Model):
    user = models.OneToOneField(User, blank=True, null=True, on_delete=models.CASCADE)
    
class Room(models.Model):
    room_num =  models.IntegerField(unique=True)
    customer = models.ForeignKey(Customer, related_name='rooms', null=True, on_delete=SET_NULL)
    booked = models.BooleanField(default=False)
    checkin = models.DateField(auto_now=False, null=True)
    checkout = models.DateField(auto_now=False, null=True)

class Amentie(models.Model):
    room = models.OneToOneField(Room,related_name='amentie', on_delete=models.CASCADE)
    beds = models.IntegerField(default=1,
                               validators=[MaxValueValidator(3), MinValueValidator(1)])
    view = models.CharField(max_length=50)
    luxury = models.CharField(max_length=50)






