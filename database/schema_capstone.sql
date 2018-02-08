CREATE DATABASE capstone;
\c capstone;

CREATE TABLE bookings (
  id SERIAL PRIMARY KEY,
  user_id INT NOT NULL,
  price SMALLINT NOT NULL,
  date_ms INT NOT NULL
);

CREATE TABLE rides (
  id SERIAL PRIMARY KEY,
  loc_zip SMALLINT NOT NULL,
  loc_lat INT NOT NULL,
  loc_lon INT NOT NULL,
  dest_zip SMALLINT NOT NULL,
  dest_lat INT NOT NULL,
  dest_lon INT NOT NULL,
  driver_id INT NOT NULL
);

/* CREATE INDEX CONCURRENTLY fast ON bookings (user_id); */