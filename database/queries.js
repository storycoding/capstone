const knex = require('./index.js').knex;

const getAll = function(table, param, value) {

	return knex(table)
		.where(param, value)
		.select()
};

const saveLogin = function(user_id, zip, lat, lon, date_ms) {

	let query = `INSERT INTO logins(user_id, zip, lat, lon, date_ms) VALUES (${user_id}, ${zip}, ${lat}, ${lon}, ${date_ms})`;

	return knex.raw(query).then(function(item, err){
		if(err) { console.error("saveLogin", err) }
	});
};

const saveRide = function(id, small_loc_zip, loc_lat, loc_lon, small_dest_zip, dest_lat, dest_lon, driver_id){

	let query = `INSERT INTO rides(id, loc_zip, loc_lat, loc_lon, dest_zip, dest_lat, dest_lon, driver_id) VALUES (${id}, ${small_loc_zip}, ${loc_lat}, ${loc_lon}, ${small_dest_zip}, ${dest_lat}, ${dest_lon}, ${driver_id})`;

	return knex.raw(query).then(function(item, err){
		if(err) { console.error("saveRide", err) }
	});

};

const saveBooking = function(user_id, price, date_ms) {

	let query = `INSERT INTO bookings(user_id, price, date_ms) VALUES (${user_id}, ${price}, ${date_ms})`;

	return knex.raw(query).then(function(item, err){
		if(err) { console.error("saveBooking", err) }
	});
};

const getBooking = function(param, value) {
	let query = `select * from bookings where ${param} = ${value}`; 
	return knex.raw(query);
}

module.exports = {
	getAll : getAll,
	saveLogin : saveLogin,
	saveRide : saveRide,
	saveBooking : saveBooking,
	getBooking : getBooking
}