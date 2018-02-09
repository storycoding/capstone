require('newrelic');
const express = require('express');
const query = require('../../database/queries.js');

const app = express()
const PORT = 2000;

app.get('/', (req, res) => {

	query.getAll('bookings','user_id', 10).then((results) => { 
		res.send(results);
	})
});

app.listen(PORT, () => console.log(`App listening on port ${PORT}!`));