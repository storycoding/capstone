var chai = require('chai'); // for node testing
var query = require('../database/queries.js');
var axios = require('axios');

const assert = chai.assert;
const should = chai.should();

describe('Write to the database', function() {
  it('should throw a success message upon making a write request to the database', function() {

   	query.saveBooking(20000, 1971, 1517955452).then(query.getBooking('id', 100005).then((result)=>{
   		console.log(result);
    	result.should.be.a('object');
    })
    );
    
  });
});

describe('Read from database', function() {
  it('should return an object from the database', function() {

    query.getBooking('id', 1).then((result)=>{
    	result.should.be.a('object');
    });
    
  });

  it('should return multiple entries from a single user_id', function() {

    query.getBooking('user_id', 1).then((result)=>{
    	//console.log(result.rows);
    	result.rows.should.have.lengthOf(5);
    });
    
  });
});

describe('Get data from the server', function() {
  it('should receive an entry from the server upon sending a GET request', function() {

   	axios.get('http://127.0.0.1:2000/')
	  .then(function (response, err) {
	  	response.should.be.a('object');
	  	//console.log("response.data =", response.data);
	  })
	  .catch(function (error) {
	    //console.log(error);
	  });
    
  });
});

setTimeout(()=>{process.exit('process ended')}, 5000);

// test a query to the database
	// test a write to the database
	// test a read after the write

// test an api call to the server