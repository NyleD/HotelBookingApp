from django.db import models
from django.db.models import SET_NULL
from django.core.validators import MaxValueValidator, MinValueValidator

class Customer(models.Model):
    name = models.CharField(max_length=50, default="")
    email = models.CharField(max_length=50, null=True)
    
class Room(models.Model):
    beds = models.IntegerField(default=1, validators=[MaxValueValidator(3), MinValueValidator(1)])
    view = models.CharField(max_length=50, default="None")
    luxury = models.CharField(max_length=50, default="None")

class Booking(models.Model):
    customer = models.ForeignKey(Customer, related_name='bookings', null=True, on_delete=models.CASCADE)
    room = models.ForeignKey(Room, related_name='bookings', null=True, on_delete=models.CASCADE)
    numguests = models.IntegerField(default=1)
    cancelled = models.BooleanField(default=False)
    checkin = models.DateField(auto_now=False, null=True)
    checkout = models.DateField(auto_now=False, null=True)
    rating = models.IntegerField(default=5)







