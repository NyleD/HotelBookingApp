
Connecting to Cloud SQL Instance and running Django: 
./cloud_sql_proxy -instances=[INSTANCENAMEONDB]=tcp:5433
python3 manage.py runserver


MORE Info on how to populate the DB....

$ python manage.py help populate_db
Usage: manage.py populate_db [options] <foo bar ...>

our help string comes here

Options:
...
1) get in django-enviroment  using above 

2)
RUN create_hotel_rooms.py on hotelrooms.csv
change path 
