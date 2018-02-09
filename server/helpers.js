const query = require('../database/queries.js');

const parseDate = function(milliseconds) {
	return new Date(milliseconds *1000);
};

const parsePrice = function(number) {
	return number / 100;
};

const parseLat = function(number) {
	return 37 + number / 10 ** number.toString().length;
}

const parseLon = function(number) {
	return (122 + number / 10 ** number.toString().length) * -1;
}

const parsePhone = function(number) {
	return 4150000000 + number;
}

const parseBooking =function(booking) {
	let result = {};

	result.id = booking.id;
	result.user_id = parsePhone(booking.user_id);
	result.price = parsePrice(booking.price);
	result.date = parseDate(booking.date_ms);

	return result;
};

module.exports = {
	parsePhone : parsePhone,
	parseLat : parseLat,
	parseLon : parseLon,
	parsePrice : parsePrice,
	parseDate : parseDate,
	parseBooking : parseBooking
}

const getFullBooking = function(param, value) {

	try {
		query.getBooking(param, value).then(function(results) {
			results = parseBooking(results.rows[0]);
			console.log(results);
			process.exit();
		});

	} catch(error) {
		console.log(`error = ${error}`);
	}
};

getFullBooking("id", 10);