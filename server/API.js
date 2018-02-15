// send a get request to fares
// after the response is here
// send the get request to drivers
// after driver is here
// send post request to events
// write booking to db
const Axios = require('axios');
const helpers = require('./helpers');
const queries = require('../database/queries.js');

const book = (user_id, date_ms, loc_zip, loc_lat, loc_lon, dest_zip, dest_lat, dest_lon) => {

	// GENERATE A BOOKING ID
	// tune in savebooking
	// tune in saveride
	// handle error cases
	// send all helpers to helpers file

	let booking = {
		user_id: user_id,
		date_ms: date_ms,
		loc_zip: loc_zip,
		loc_lat: loc_lat,
		loc_lon: loc_lon,
		dest_zip: dest_zip,
		dest_lat: dest_lat,
		dest_lon: dest_lon,
		date_ms: Date.now();
	};

	Axios.get('/fares', {
  		params: {
  			user_id: user_id,
			date_ms: date_ms,
			loc_zip: loc_zip,
			loc_lat: loc_lat,
			loc_lon: loc_lon,
			dest_zip: dest_zip,
			dest_lat: dest_lat,
			dest_lon: dest_lon
		}
	})
	.then(function (response) {

		booking.price = helpers.randomPrice(helpers.randomRate(),loc_zip, dest_zip);

		if (booking.price < 1200) {
			booking.accepted = true;

		} else {
			booking.accepted = false;
		}

		if(booking.accepted) {
			Axios.post('/requestdriver', {
  				params: {
  					p_lat: helpers.parseLat(loc_lat),
  					p_lon: helpers.parseLon(loc_lon),
  					p_zip: helpers.parseZip(loc_zip),
  					dest_lat: helpers.parseLat(dest_lat),
  					dest_lon: helpers.parseLon(dest_lon),
  					dest_zip: helpers.parseZip(dest_zip)
  				}}
			})
			.then(function(response) {
				booking.driver_id = response.driverId,
      			booking.name_first = response.name_first,
      			booking.license_plate = response.license_plate,
      			booking.driver_phone = response.phone,
      			booking.car_make = response.car_make,
      			booking.car_model = response.car_model,
      			booking.car_year = response.car_year

      			console.log("booking = ", booking);

      			Axios.post('/requests', {
      				params: {
      					id: 1,
      					rate: 2,
      					zipOrigin: booking.loc_zip,
      					zipDestination: booking.dest_zip,
      					timestamp: booking.date,
      					price: booking.price,
      					ride: booking.accepted
      				}
      			}).then(console.log("booking sent to events"));

      			queries.saveBooking().then(console.log("booking saved to database"));
      			queries.saveRide().then("ride saved to database");
			});
		}

		if(true) {
			booking.accepted = true;
		}
	})
	.catch(function (error) {
		console.error(error);
	});

}