CREATE DATABASE capstone;
\c capstone;

CREATE TABLE logins (
  id SERIAL NOT NULL,
  user_id INT NOT NULL PRIMARY KEY,
  zip SMALLINT NOT NULL,
  lat DECIMAL(9,7) NOT NULL,
  lon DECIMAL(10,7) NOT NULL,
  date_ms INT NOT NULL
);

CREATE TABLE bookings (
  id SERIAL NOT NULL,
  user_id INT NOT NULL,
  price SMALLINT NOT NULL,
  date_ms INT NOT NULL
);

CREATE TABLE rides (
  id SERIAL PRIMARY KEY,
  loc_zip SMALLINT NOT NULL,
  loc_lat DECIMAL(9,7) NOT NULL,
  loc_lon DECIMAL(10,7) NOT NULL,
  dest_zip SMALLINT NOT NULL,
  dest_lat DECIMAL(9,7) NOT NULL,
  dest_lon DECIMAL(10,7) NOT NULL,
  driver_id INT NOT NULL,
  user_id INT NOT NULL
);

/* CREATE INDEX CONCURRENTLY fast ON bookings (user_id); */