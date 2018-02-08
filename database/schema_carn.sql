CREATE DATABASE carn;
\c carn;

CREATE TABLE bookings (
  id SERIAL PRIMARY KEY,
  user_id INT NOT NULL,
  driver_id INT NOT NULL,
  loc_zip INT NOT NULL,
  loc_lat DECIMAL(9,7) NOT NULL,
  loc_lon DECIMAL(10,7) NOT NULL,
  dest_zip INT NOT NULL,
  dest_lat DECIMAL(9,7) NOT NULL,
  dest_lon DECIMAL(10,7) NOT NULL,
  rate INT NOT NULL,
  price DECIMAL(6,2) NOT NULL,
  date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);