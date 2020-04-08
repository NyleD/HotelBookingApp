from rest_framework import serializers
from .models import Customer, Room, Booking

class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = ('user_id', 'name')

class RoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = ('room_num', 'beds', 'view', 'luxury')


class BookingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Booking
        fields = ('book_id', 'customer', 'room', 'numguests', 'cancelled', 'checkin', 'checkout')
