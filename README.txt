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

