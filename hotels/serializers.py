from rest_framework import serializers
from .models import Customer, Room, Booking

class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = ('id', 'name', 'email')

class RoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = ('id', 'beds', 'view', 'luxury')


class BookingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Booking
        fields = ('id', 'customer', 'room', 'numguests', 'cancelled', 'checkin', 'checkout', 'rating')
