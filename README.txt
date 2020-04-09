DATABASE:
The data for the application is auto generated and processed to fit our data schema. The csv files are manually uploaded to the GCP (under Storage) and manually imported into the Tables.


Intial Setup
After Clone
1) Install python & and pip & pipenv
2) pipenv install inside the repo (to get all dependencies)
3) pipenv shell (Always when working on the repo)
4) Done

Connecting to Cloud SQL Instance and running Django: 
./cloud_sql_proxy -instances=[INSTANCENAMEONDB]=tcp:5433
python3 manage.py runserver

Expecting the Frontend to run at:
localhost:3000/


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
