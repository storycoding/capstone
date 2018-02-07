require('newrelic');

const http = require('http');
const query = require('../../database/queries.js');

const hostname = '127.0.0.1';
const port = 2000;

const server = http.createServer((req, res) => {

	try {
		query.getAll('bookings','user_id', 10).then(function(results) {

			console.log("results = ", results);
			res.statusCode = 200;
  			res.setHeader('Content-Type', 'application/json');
  			res.end(JSON.stringify(results));
  			
		});
	}
	catch(error) {
		console.log(`error = ${error}`);
	}
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});