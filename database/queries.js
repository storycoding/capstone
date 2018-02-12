const knex = require('./index.js').knex;

const getBooking = (param, value) => {
	return knex('bookings')
		.where(param, value)
		.select()
};

const getRide = (param, value) => {
	let query = `select * from rides where ${param} = ${value}`; 

	//console.log("getRide query = ", query);

	return knex.raw(query);
}

const saveRide = (id, small_loc_zip, loc_lat, loc_lon, small_dest_zip, dest_lat, dest_lon, driver_id) => {

	let query = `INSERT INTO rides(id, loc_zip, loc_lat, loc_lon, dest_zip, dest_lat, dest_lon, driver_id) VALUES (${id}, ${small_loc_zip}, ${loc_lat}, ${loc_lon}, ${small_dest_zip}, ${dest_lat}, ${dest_lon}, ${driver_id})`;

	//console.log("saveRide query = ", query);

	return knex.raw(query).then((item, err) => {
		if(err) { console.error("saveRide", err) }
	});

};

const saveBooking = (user_id, price, date_ms) => {

	let query = `INSERT INTO bookings(user_id, price, date_ms) VALUES (${user_id}, ${price}, ${date_ms})`;

	return knex.raw(query).then((item, err) => {
		if(err) { console.error("saveBooking", err) }
	});
};

module.exports = {
	saveBooking : saveBooking,
	getBooking : getBooking,
	saveRide : saveRide,
	getRide : getRide	
}