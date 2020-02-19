

-- Query to get user defined by username -> used to make customers
SELECT `auth_user`.`id`, `auth_user`.`password`, `auth_user`.`last_login`, `auth_user`.`is_superuser`, `auth_user`.`username`, `auth_user`.`first_name`, `auth_user`.`last_name`, `auth_user`.`email`, `auth_user`.`is_staff`, `auth_user`.`is_active`, `auth_user`.`date_joined` FROM `auth_user` WHERE `auth_user`.`username` = a

-- Display to Front End -> All hotels that are currently not booked
SELECT `hotels_room`.`id`, `hotels_room`.`room_num`, `hotels_room`.`customer_id`, `hotels_room`.`booked`, `hotels_room`.`checkin`, `hotels_room`.`checkout` FROM `hotels_room` WHERE `hotels_room`.`booked` = False

-- Display all rooms
SELECT `hotels_room`.`id`, `hotels_room`.`room_num`, `hotels_room`.`customer_id`, `hotels_room`.`booked`, `hotels_room`.`checkin`, `hotels_room`.`checkout` FROM `hotels_room`

-- Add booked = True
UPDATE `hotels_room` SET `customer_id` = 4 WHERE `hotels_room`.`id` IN (2)', 'time': '0.031'