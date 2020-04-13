from django.shortcuts import render
from rest_framework import viewsets          
from .serializers import CustomerSerializer, RoomSerializer, BookingSerializer     
from .models import Customer, Room, Booking
from django.core import serializers
from django.http import HttpResponse, JsonResponse

from django.db.models import Avg
from django.db.models import Sum

class CustomerView(viewsets.ModelViewSet): 
      serializer_class = CustomerSerializer          
      queryset = Customer.objects.all()              

class RoomView(viewsets.ModelViewSet):       
      serializer_class = RoomSerializer          
      queryset = Room.objects.all()  

class BookingView(viewsets.ModelViewSet):       
      serializer_class = BookingSerializer          
      queryset = Booking.objects.all()

# Filtering and Adding a Booking Part Queries

def filterRooms(request):
          serializer_class = RoomSerializer
          queryset = Room.objects.all()
          room_id = request.GET.get('room_id',None)
          beds = request.GET.get('beds',None)
          view = request.GET.get('view',None)
          luxury = request.GET.get('luxury',None)

          if beds and view and luxury:
              queryset = queryset.filter(beds = beds, view = view, luxury = luxury)
          elif room_id:
              queryset = queryset.filter(id = room_id)
          qs_json = serializers.serialize('json',queryset)
          return HttpResponse(qs_json, content_type='application/json')

def filterBookings(request):
          serializer_class = BookingSerializer
          room_id = request.GET.get('room_id',None)
          mycheckin = request.GET.get('checkin',None)
          mycheckout = request.GET.get('checkout',None)

          if room_id and mycheckin and mycheckout:
              queryset = Booking.objects.raw('''SELECT * from hotels_booking
                       where room_id = %s and
                       checkin < %s and
                       checkout > %s ''', [room_id, mycheckout, mycheckin])
              qs_json = serializers.serialize('json',queryset)
              return HttpResponse(qs_json, content_type='application/json')

def filterCustomers(request):
          serializer_class = CustomerSerializer
          name = request.GET.get('name',None)
          email = request.GET.get('email',None)

          if name and email:
              queryset = Customer.objects.raw('''SELECT id from hotels_customer
                       where name = %s and
                       email = %s''', [name, email])
              qs_json = serializers.serialize('json',queryset)
              return HttpResponse(qs_json, content_type='application/json')

def avgRating(request):
  serializer_class = BookingSerializer
  #queryset =  Booking.objects.filter(cancelled=0).aggregate(Avg('rating'))
  queryset = Booking.objects.raw('''SELECT AVG(rating) FROM hotels_booking WHERE cancelled=0''')
  qs_json = serializers.serialize('json',queryset)
  return HttpResponse(qs_json, content_type='application/json')

def sumBookings(request):
  serializer_class = BookingSerializer
  queryset = Booking.objects.exclude(cancelled=0).aggregate(Count())
  qs_json = serializers.serialize('json',queryset)
  return HttpResponse(qs_json, content_type='application/json')

def sumEmptyRooms(request):
  return

def mostPopularView(request):
  serializer_class = BookingSerializer
  queryset = Booking.objects.raw('''SELECT view
                                      FROM (SELECT COUNT(*) AS total_bookings, view 
                                             FROM hotels_booking WHERE cancelled = 0 GROUP BY view) AS view_bookings
                                      WHERE total_bookings=(SELECT MAX(total_bookings) FROM view_bookings))''')
  qs_json = serializers.serialize('json',queryset)
  return HttpResponse(qs_json, content_type='application/json')


"""
Removed the features below this as they were regarding the old DB schema
"""

