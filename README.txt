// DATABASE:
// The data for the application is auto generated and processed to fit our data schema. The csv files are manually uploaded to the GCP (under Storage) and manually imported into the Tables.
// IMPORTANT: Before you start, you should have python3, pip and pipenv installed in your machine

// Open three terminals that are in the same empty folder

// 1.In the first terminal, run the following command:
git clone https://github.com/NyleD/HotelBookingApp.git
cd HotelBookingApp/

// You are going to connect to our GCP database though the GCP cloud_sql_proxy:
// The cloud_sql_proxy executable in the folder is for Linux-64, if you are using other OS, please download the corresponding cloud_sql_proxy from here and make
// the file executable:
// https://cloud.google.com/sql/docs/mysql/connect-admin-proxy
// Then run:
./cloud_sql_proxy -instances=cs343demo1:us-central1:cs348demo-db=tcp:5433


// 2.In the second terminal:
// If it is not in the project folder:
//	cd HotelBookingApp/
pipenv install
pipenv shell
python manage.py runserver

// 3.In the third terminal:
// If it is not in the project folder:
//	cd HotelBookingApp/
//Then run:
cd hotelfrontend/
npm install
npm start


// To access the application, open the browser, go to localhost:3000

## Final Features
● Filter rooms that match search criteria
● Check these rooms against existing bookings on those rooms and present
results that don’t overlap with existing bookings
● Favourite / Unfavourite results to save them to book later (This feature uses the
browser’s local storage and not the prod. DB like the other features)
● If customer enters details, create booking under old customer id if customer
exists, if not, create a new customer and then create a new booking
● Update a booking
● Cancel a booking.
● Rate a booking.
● Display the hotel’s average rating.
● Display the number of rooms currently available at the hotel.
● Display the number of customers received so far.
● Display the most popular type of view at the hotel.
