const query = require('../database/queries.js');


const randomRate = () => {
  return Math.floor(Math.random() * (8) + 1);
};

const randomPrice = (rate, loc_zip, dest_zip) => {
  if (loc_zip < dest_zip) {
    var min = loc_zip;
    var max = dest_zip;

  } else {
    var max = loc_zip;
    var min = dest_zip;
  }

  return (100 * (Math.random() * (max - min) / 2 * rate + 3)).toFixed();
};

const parseZip = function(number) {
	return 94100 + number;
}

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
	randomRate : randomRate,
	randomPrice : randomPrice,
	parseZip : parseZip,
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