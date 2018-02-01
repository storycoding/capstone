const pg = require('./index.js').pg;

const saveLogin = function(lat, lon, zip) {

	let query = `INSERT INTO passengers(lat, lon, zip) VALUES (${lat}, ${lon}, ${zip})`;
	return pg.raw(query).then(console.log(query));
};

const saveDriver = function(lat, lon, zip) {

	let query = `INSERT INTO drivers(lat, lon, zip) VALUES (${lat}, ${lon}, ${zip})`;
	return pg.raw(query);
};

const saveBooking = function( user_id, driver_id, loc_zip, loc_lat, loc_lon, dest_zip, dest_lat, dest_lon, rate, price) {

	let query = `INSERT INTO bookings(user_id, driver_id, loc_zip, loc_lat, loc_lon, dest_zip, dest_lat, dest_lon, rate, price) VALUES (${user_id}, ${driver_id}, ${loc_zip}, ${loc_lat}, ${loc_lon}, ${dest_zip}, ${dest_lat}, ${dest_lon}, ${rate}, ${price})`;

	return pg.raw(query).then(console.log(query));
};

module.exports = {
	saveBooking : saveBooking,
	saveLogin : saveLogin,
	saveDriver : saveDriver
}



// INSERT INTO passengers(id, lat, lon) VALUES (1966545626, 377446615, -1224149368)
// INSERT INTO drivers(id, lat, lon) VALUES (763284024, 377836924, -1224111553);

//INSERT INTO bookings(user_id, driver_id, loc_zip, loc_lat, loc_lon, dest_zip, dest_lat, dest_lon, rate, price) VALUES (0000031, 5069288, 94132, 37.7218297, -122.5029057, 94134, 37.71795, -122.424504, 1, 3.00);

//SELECT reltuples AS approximate_row_count FROM pg_class WHERE relname = 'passengers';
