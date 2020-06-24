from django.shortcuts import render
from rest_framework import viewsets, filters
from .serializers import CustomerSerializer, RoomSerializer, BookingSerializer     
from .models import Customer, Room, Booking
from django.core import serializers
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
import django_filters.rest_framework
from rest_framework import generics
from django.db.models import Avg, Count
import json
from django.http import JsonResponse



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
    """
    -- Getting all booking made by a customer using thier id
    
    SQL Query: 
    SELECT `hotels_booking`.`id`, `hotels_booking`.`customer_id`, `hotels_booking`.`room_id`, `hotels_booking`.`numguests`, `hotels_booking`.`cancelled`, `hotels_booking`.`checkin`, `hotels_booking`.`checkout`, `hotels_booking`.`rating` FROM `hotels_booking` WHERE `hotels_booking`.`customer_id` = %d
    """

    serializer_class = BookingSerializer

    def get_queryset(self):
        queryset = Booking.objects.all()
        customer = self.request.query_params.get('customer', None)
        if customer is not None:
            queryset = queryset.filter(customer=customer)
        return queryset


# Filtering and Adding a Booking Part Queries



def filterRooms(request):
    """
    -- Getting Room Availablity by beds, view and luxury

    SQL Query: 
    SELECT `hotels_room`.`id`, `hotels_room`.`beds`, `hotels_room`.`view`, `hotels_room`.`luxury` FROM `hotels_room` WHERE (`hotels_room`.`beds` = %d AND `hotels_room`.`luxury` = %s AND `hotels_room`.`view` = %s)
    """


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


@csrf_exempt
def modifyBooking(request):
          """
          -- Update an existing booking

          SQL Query: 
          UPDATE `hotels_booking` SET ``hotels_booking`.`numguests` = %d, `hotels_booking`.`cancelled` = %d, `hotels_booking`.`checkin` = %s,
          `hotels_booking`.`checkout` = %s, `hotels_booking`.`customer_id` = %d, `hotels_booking`.`room_id` = %d, `hotels_booking`.`rating` = %d
          WHERE `hotels_booking`.`id` = %d
          """
          if request.method == 'PUT':
              
              json_data = json.loads(request.body)
              # print(json_data)
              if 'booking_id' not in json_data:
                  raise ValueError("No booking_id in given json data")
              if 'numguests' not in json_data:
                  raise ValueError("No numguests in given json data")
              if 'cancelled' not in json_data:
                  raise ValueError("No cancelled in given json data")
              if 'checkin' not in json_data:
                  raise ValueError("No checkin in given json data")
              if 'checkout' not in json_data:
                  raise ValueError("No checkout in given json data")
              if 'customer_id' not in json_data:
                  raise ValueError("No customer_id in given json data")
              if 'room_id' not in json_data:
                  raise ValueError("No room_id in given json data")
              if 'rating' not in json_data:
                  raise ValueError("No rating in given json data")
              

              booking_id = json_data["booking_id"]
              numguests = json_data["numguests"]
              cancelled = json_data["cancelled"]
              checkin = json_data["checkin"]
              checkout = json_data["checkout"]
              customer_id = json_data["customer_id"]
              room_id = json_data["room_id"]
              rating = json_data["rating"]


              overbook = False
              booking_for_the_room = json.loads(serializers.serialize('json',Booking.objects.filter(room_id=room_id)))
              for b in booking_for_the_room:
                checkin_date = b["fields"]["checkin"]
                checkout_date = b["fields"]["checkout"]
                b_id = b["pk"]
                b_cancelled = b["fields"]["cancelled"]
                if(b_id == booking_id or b_cancelled == True): continue
                if(checkin <= checkout_date and checkin_date <= checkout):
                  # there is overlap
                  qs_json = json.dumps({"result":"Fail", "Conflict" : b})
                  return HttpResponse(qs_json, content_type='application/json')

             
              Booking.objects.filter(id=booking_id).update(numguests=numguests,cancelled=cancelled,
                checkin=checkin, checkout=checkout, customer_id=customer_id,room_id=room_id,rating=rating)

              qs_json = json.loads(serializers.serialize('json',Booking.objects.filter(id=booking_id)))
              qs_json[0]["result"] = "Success"
              qs_json = json.dumps(qs_json[0])
              # qs_json["result"] = "Success"
              return HttpResponse(qs_json, content_type='application/json')



def avgRating(request):
      """
      Finds the Average Rating Given by Customers for Our Hotel Bookings So Far

      SQL Query: 
      SET SESSION TRANSACTION ISOLATION LEVEL READ COMMITTED
      SELECT AVG(`hotels_booking`.`rating`) AS `rating__avg` FROM `hotels_booking` WHERE `hotels_booking`.`cancelled` = 0
      """
      serializer_class = BookingSerializer
      queryset = Booking.objects.all()
      queryset = queryset.filter(cancelled=0)
      queryset = queryset.aggregate(Avg('rating'))
      print(queryset)
      return JsonResponse(queryset, safe=False)


def sumBookings(request):

  """
  Total Bookings Completed By this Hotel 

  SQL Query:
  SELECT COUNT(*) AS `__count` FROM `hotels_booking` WHERE `hotels_booking`.`cancelled` = 0
  """

  serializer_class = BookingSerializer
  queryset = Booking.objects.filter(cancelled=0).count()
  print(queryset)
  return JsonResponse(queryset, safe=False)

from datetime import datetime

def sumEmptyRooms(request):
    """
    Rooms Currently Empty -> Open to Customers

    SQL Query:

    1) Findings active bookings that are not cancelled 

    SELECT COUNT(*) FROM (SELECT DISTINCT `hotels_booking`.`room_id` AS Col1 FROM `hotels_booking` WHERE (`hotels_booking`.`cancelled` = 0 AND `hotels_booking`.`checkin` <= %date AND `hotels_booking`.`checkout` >= %date
    
    2) Find Total Rooms

    SELECT COUNT(*) AS `__count` FROM `hotels_room


    return Total Rooms - Active Bookings
    """

    now=datetime.today()

    # Active Bookings
    bookings = Booking.objects.filter(cancelled=0)
    bookings = bookings.filter(checkin__lte=now)
    bookings = bookings.filter(checkout__gte=now)
    rooms_booked = bookings.values('room__id').distinct().count()
    print("rooms_booked__count")
    print(rooms_booked)

    rooms = Room.objects.all().count()
    print("rooms_count")
    print(rooms)

    empty_rooms = rooms - rooms_booked
    return JsonResponse(empty_rooms, safe=False)

def mostPopularView(request):

  """
  Find Most Popular View for Hotel Bookings 

  Steps: 
  Do a Left Outer join of Bookings and Rooms
  Group By Views 
  Do a Count on Bookings (NOT Rooms)
  Order BY ASC
  Get Last Element

  SQL Query

  SELECT `hotels_room`.`view`, COUNT(`hotels_booking`.`room_id`) AS `rooms` 
  FROM `hotels_booking` 
  LEFT OUTER JOIN 
  `hotels_room` ON (`hotels_booking`.`room_id` = `hotels_room`.`id`) 
  WHERE `hotels_booking`.`cancelled` = 0 
  GROUP BY `hotels_room`.`view` ORDER BY `rooms` 
  DESC LIMIT 1
  """

  serializer_class = BookingSerializer


  queryset = Booking.objects.filter(cancelled=0).values('room__view').annotate(rooms=Count('room'))
  queryset = queryset.order_by('rooms').last()
  print(queryset)
  return JsonResponse(queryset, safe=False)

