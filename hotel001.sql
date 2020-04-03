--
-- Create model Customer
--
CREATE TABLE `hotels_customer` (`id` integer AUTO_INCREMENT NOT NULL PRIMARY KEY, `user_id` integer NULL UNIQUE);
--
-- Create model Room
--
CREATE TABLE `hotels_room` (`id` integer AUTO_INCREMENT NOT NULL PRIMARY KEY, `room_num` integer NOT NULL UNIQUE, `booked` bool NOT NULL, `checkin` date NOT NULL, `checkout` date NOT NULL, `customer_id` integer NULL);
--
-- Create model Amentie
--
CREATE TABLE `hotels_amentie` (`id` integer AUTO_INCREMENT NOT NULL PRIMARY KEY, `beds` integer NOT NULL, `view` varchar(50) NOT NULL, `luxury` varchar(50) NOT NULL, `room_id` integer NOT NULL UNIQUE);
ALTER TABLE `hotels_customer` ADD CONSTRAINT `hotels_customer_user_id_59c37021_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`);
ALTER TABLE `hotels_room` ADD CONSTRAINT `hotels_room_customer_id_c7983838_fk_hotels_customer_id` FOREIGN KEY (`customer_id`) REFERENCES `hotels_customer` (`id`);
ALTER TABLE `hotels_amentie` ADD CONSTRAINT `hotels_amentie_room_id_180d3636_fk_hotels_room_id` FOREIGN KEY (`room_id`) REFERENCES `hotels_room` (`id`);


-- This Coloumn is used so much to query details about the room, book unbook
-- provide service, as our database expands room_num is a must to optimize on
CREATE INDEX iroom ON Room (room_num); 

-- To provide availibilties, booked, maintaince of rooms, future analytics. As our
-- database expands querying based on these ranges is must
-- Airbnb has shown us the way with how much dates come in handy :) 
CREATE INDEX ichekin ON Room (checkin); 
CREATE INDEX ichekin ON Room (checkout); 

