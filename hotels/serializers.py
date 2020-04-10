from rest_framework import serializers
from .models import Customer, Room, Booking

class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = ('name', 'email')

class RoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = ('beds', 'view', 'luxury')


class BookingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Booking
        fields = ('customer', 'room', 'numguests', 'cancelled', 'checkin', 'checkout', 'rating')
