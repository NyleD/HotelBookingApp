from django.shortcuts import render


# 7 features implmented -> just need to call queries in the front-end

def get_customer(request) :

    # 1
    user = request.user
    cursor = connection.cursor()
    cursor.execute('''SELECT `auth_user`.`id`, `auth_user`.`password`, `auth_user`.`last_login`, `auth_user`.`is_superuser`, `auth_user`.`username`, `auth_user`.`first_name`, `auth_user`.`last_name`, `auth_user`.`email`, `auth_user`.`is_staff`, `auth_user`.`is_active`, `auth_user`.`date_joined` FROM `auth_user` WHERE `auth_user`.`username` = %s''', [user])
    row = cursor.fetchone()

    print row

    context = {"row":row}
    return render(request, "customer.html", context)


def get_hotels(request) :

    # 2
    cursor = connection.cursor()
    if request.booking == True: # Display Booked or Unbooked Homes 
        booked = request.booking
        cursor.execute('''SELECT `hotels_room`.`id`, `hotels_room`.`room_num`, `hotels_room`.`customer_id`, `hotels_room`.`booked`, `hotels_room`.`checkin`, `hotels_room`.`checkout` FROM `hotels_room` WHERE `hotels_room`.`booked` = %s''', [booked])
    # 3
    else:
        # Display all Rooms
        cursor.execute('''SELECT `hotels_room`.`id`, `hotels_room`.`room_num`, `hotels_room`.`customer_id`, `hotels_room`.`booked`, `hotels_room`.`checkin`, `hotels_room`.`checkout` FROM `hotels_room`''')

    row = cursor.fetchone()
    print row
    context = {"row":row}
    return render(request, "rooms.html", context)


def book(request) :

    # 4
    if request.book == True: # Display Booked or Unbooked Homes 
        room_num = request.room_num
        cus_id = request.customer_id
        time = request.timestamp

        cursor = connection.cursor()
        cursor.execute('''UPDATE `hotels_room` SET `customer_id` = %d WHERE `hotels_room`.`id` IN (%d)', 'time': %s''', [room_num], [cus_id], [time])
    