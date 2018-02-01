CREATE DATABASE carn;
\c carn;

CREATE TABLE passengers (
  id SERIAL PRIMARY KEY,
  zip INT NOT NULL,
  lat DECIMAL(9,7) NOT NULL,
  lon DECIMAL(10,7) NOT NULL,
  dest_zip INT NOT NULL,
  dest_lat DECIMAL(9,7) NOT NULL,
  dest_lon DECIMAL(10,7) NOT NULL,
  last_seen TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE drivers (
  id SERIAL PRIMARY KEY,
  zip INT NOT NULL,
  lat DECIMAL(9,7) NOT NULL,
  lon DECIMAL(10,7) NOT NULL
);

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

/* COPY passengers FROM '/Users/macbookair/Documents/GitHub/car-n/passenger/database/passengerData/users1.txt' DELIMITERS ',' CSV QUOTE '\n'; */