from django.shortcuts import render
from rest_framework import viewsets, filters
from .serializers import CustomerSerializer, RoomSerializer, BookingSerializer     
from .models import Customer, Room, Booking
from django.core import serializers
from django.http import HttpResponse
import django_filters.rest_framework
from rest_framework import generics
from django.db.models import Avg, Count

class CustomerView(viewsets.ModelViewSet): 
      serializer_class = CustomerSerializer          
      queryset = Customer.objects.all()              

class RoomView(viewsets.ModelViewSet):       
      serializer_class = RoomSerializer          
      queryset = Room.objects.all()  


class BookingView(viewsets.ModelViewSet):       
      serializer_class = BookingSerializer          
      queryset = Booking.objects.all() 


# Changing my Bookings: Get all Bookings by User ID for Jacky
class BookingsList(generics.ListAPIView):
    serializer_class = BookingSerializer

    def get_queryset(self):
        queryset = Booking.objects.all()
        customer = self.request.query_params.get('customer', None)
        if customer is not None:
            queryset = queryset.filter(customer=customer)
        return queryset


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

from django.http import JsonResponse

def avgRating(request):
  serializer_class = BookingSerializer

  queryset = Booking.objects.all()
  queryset = queryset.filter(cancelled=0)
  queryset = queryset.aggregate(Avg('rating'))
  print(queryset)
  return JsonResponse(queryset, safe=False)


def sumBookings(request):
  serializer_class = BookingSerializer
  queryset = Booking.objects.filter(cancelled=0).count()
  print(queryset)
  return JsonResponse(queryset, safe=False)

from datetime import datetime
def sumEmptyRooms(request):
    now=datetime.today()

    # Active Bookings
    bookings = Booking.objects.filter(cancelled=0)
    bookings = bookings.filter(checkin__lte=now)
    rooms_booked = bookings.values('room__id').distinct().count()
    print("rooms_booked__count")
    print(rooms_booked)

    rooms = Room.objects.all().count()
    print("rooms_count")
    print(rooms)

    empty_rooms = rooms - rooms_booked
    return JsonResponse(empty_rooms, safe=False)

def mostPopularView(request):
  serializer_class = BookingSerializer


  queryset = Booking.objects.filter(cancelled=0).values('room__view').annotate(rooms=Count('room'))
  queryset = queryset.order_by('rooms').last()
  print(queryset)
  return JsonResponse(queryset, safe=False)
