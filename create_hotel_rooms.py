 
 

# path = name it based on your local preferences

with open(path) as f:
        reader = csv.reader(f)
        for row in reader:

            room = Room.objects.get_or_create(
                room_num =  row[0], 
                booked = row[1],
                checkin = row[2], 
                checkout = row[3],
                )

            amentie = Amentie.objects.get_or_create(
                beds = row[4]
                view = row[5]
                luxury = row[6]
                )

                # Assign Foriegn Key
                amentie.room = room
                amentie.save()



            