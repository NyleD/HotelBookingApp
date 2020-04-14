
-- 7+ Features

-- Query to get user defined by username -> used to make customers
SELECT `auth_user`.`id`, `auth_user`.`password`, `auth_user`.`last_login`, `auth_user`.`is_superuser`, `auth_user`.`username`, `auth_user`.`first_name`, `auth_user`.`last_name`, `auth_user`.`email`, `auth_user`.`is_staff`, `auth_user`.`is_active`, `auth_user`.`date_joined` FROM `auth_user` WHERE `auth_user`.`username` = a

-- Display to Front End -> All hotels that are currently not booked
SELECT `hotels_room`.`id`, `hotels_room`.`room_num`, `hotels_room`.`customer_id`, `hotels_room`.`booked`, `hotels_room`.`checkin`, `hotels_room`.`checkout` FROM `hotels_room` WHERE `hotels_room`.`booked` = False

-- Display all rooms
SELECT `hotels_room`.`id`, `hotels_room`.`room_num`, `hotels_room`.`customer_id`, `hotels_room`.`booked`, `hotels_room`.`checkin`, `hotels_room`.`checkout` FROM `hotels_room`

-- Getting all booking made by a customer using thier id
SELECT `hotels_booking`.`id`, `hotels_booking`.`customer_id`, `hotels_booking`.`room_id`, `hotels_booking`.`numguests`, `hotels_booking`.`cancelled`, `hotels_booking`.`checkin`, `hotels_booking`.`checkout`, `hotels_booking`.`rating` FROM `hotels_booking` WHERE `hotels_booking`.`customer_id` = 438

-- Getting Room Availablity by thier features
SELECT `hotels_room`.`id`, `hotels_room`.`beds`, `hotels_room`.`view`, `hotels_room`.`luxury` FROM `hotels_room` WHERE (`hotels_room`.`beds` = 2 AND `hotels_room`.`luxury` = Queen AND `hotels_room`.`view` = Street View)

-- Add a booking for a customer
UPDATE `hotels_room` SET `customer_id` = 4 WHERE `hotels_room`.`id` IN (2)

-- Total Bookings Completed By this Hotel 
SELECT COUNT(*) AS `__count` FROM `hotels_booking` WHERE `hotels_booking`.`cancelled` = 0

-- Most Popular View
SELECT `hotels_room`.`view`, COUNT(`hotels_booking`.`room_id`) AS `rooms` FROM `hotels_booking` LEFT OUTER JOIN `hotels_room` ON (`hotels_booking`.`room_id` = `hotels_room`.`id`) WHERE `hotels_booking`.`cancelled` = 0 GROUP BY `hotels_room`.`view` ORDER BY `rooms` DESC LIMIT 1


--Finds the Average Rating Given by Customers for Our Hotel Bookings So Far
SET SESSION TRANSACTION ISOLATION LEVEL READ COMMITTED
SELECT AVG(`hotels_booking`.`rating`) AS `rating__avg` FROM `hotels_booking` WHERE `hotels_booking`.`cancelled` = 0
