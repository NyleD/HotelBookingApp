from django.db import models
from django.contrib.auth.models import User
from django.db.models import SET_NULL
from django.core.validators import MaxValueValidator, MinValueValidator

class Customer(models.Model):
    user = models.OneToOneField(User, blank=True, null=True, on_delete=models.CASCADE)
    
class Room(models.Model):
    room_num = models.IntegerField(unique=True)
    beds = models.IntegerField(default=1, validators=[MaxValueValidator(3), MinValueValidator(1)])
    view = models.CharField(max_length=50, default="None")
    luxury = models.CharField(max_length=50, default="None")

class Bookings(models.Model):
    book_id = models.IntegerField(unique=True)
    customer = models.ForeignKey(Customer, related_name='bookings', null=True, on_delete=models.CASCADE)
    room = models.ForeignKey(Room, related_name='bookings', null=True, on_delete=models.CASCADE)
    numguests = models.IntegerField(default=1)
    cancelled = models.BooleanField(default=False)
    checkin = models.DateField(auto_now=False, null=True)
    checkout = models.DateField(auto_now=False, null=True)







