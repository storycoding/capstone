require('newrelic');

const http = require('http');
const query = require('../../database/queries.js');
const router = require('./router');
const url = require('url');

const hostname = '127.0.0.1';
const port = 2000;

router.register('/', function(req, res) {

	try {
		query.getBooking('user_id', 10).then((results) => {
			res.statusCode = 200;
  			res.setHeader('Content-Type', 'application/json');
  			res.end(JSON.stringify(results));		
		});
	}

	catch(error) {
		res.statusCode = 404;
		console.log(`error = ${error}`);
		res.end(`error = ${error}`);
	}	
});


router.register('/write', function(req, res) {
	const reqBody = url.parse(req.url, true);

	let param = reqBody.query.param;
	let value = parseInt(reqBody.query.value);

	try {

		query.saveRide(id, small_loc_zip, loc_lat, loc_lon, small_dest_zip, dest_lat, dest_lon, driver_id).then(()=>{console.log(`wrote saveRide id:${id}`)}
        );

      	query.saveBooking(user_id, price, date_ms).then(()=>{console.log(`queued saveBooking id:${id}`)});



		query.getBooking(param, value).then((results) => {
			res.statusCode = 200;
  			res.setHeader('Content-Type', 'application/json');
  			res.end(JSON.stringify(results));
  			
		});
	}

	catch(error) {
		res.statusCode = 404;
		console.log(`error = ${error}`);
		res.end(`error = ${error}`);
	}
});

router.register('/bookings', function(req, res) {
	const reqBody = url.parse(req.url, true);

	let param = reqBody.query.param;
	let value = parseInt(reqBody.query.value);

	try {
		query.getBooking(param, value).then((results) => {
			res.statusCode = 200;
  			res.setHeader('Content-Type', 'application/json');
  			res.end(JSON.stringify(results));
  			
		});
	}

	catch(error) {
		res.statusCode = 404;
		console.log(`error = ${error}`);
		res.end(`error = ${error}`);
	}	
});

const server = http.createServer(function (req, res) {
 	handler = router.route(req);
 	handler.process(req, res);
});


server.listen(port, hostname, () => {
  	console.log(`Server running at http://${hostname}:${port}/`);
});
	console.log('Server running');