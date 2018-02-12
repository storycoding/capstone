var chai = require('chai');
var query = require('../database/queries.js');
var axios = require('axios');

const assert = chai.assert;
const should = chai.should();

describe('queries.saveBooking', () => {

  it('should write to the bookings table', () => {
   	  query.saveBooking(20000, 1971, 1517955452)
        .then(query.getBooking('id', 100005)
          .then((result) => {
            //console.log("typeof result = ", result);
      	    result.should.be.a('object');
          })
        );
    });

});


describe('queries.getBooking', () => {

  it('should return an object from the database', () => {
    query.getBooking('id', 1).then((result) => {
    	result.should.be.a('object');
    });
  });

  it('should return multiple entries from a single user_id', () => {
    query.getBooking('user_id', 1)
      .then((result) => {
        //console.log('result = ', result);
    	  result.rows.should.have.lengthOf(5);
      });
  });
});


describe('queries.saveRide', () => {

  it('should write to the rides table', () => {
      query.saveRide(17, 7687991, 4627462, 31, 7461683, 4523647, 5069788)
        .then(query.getRide('id', 17)
          .then((result) => {
            //console.log('getRide after saveRide = ', result)
            result.should.be.a('object');
          })
        );
    });
});


describe('queries.getRide', () => {

  it('should return an object from the bookings table', () => {
    query.getRide('id', 1).then((result) => {
      //console.log("getRide result = ", result)
      result.should.be.a('object');
    });
  });

});


describe('Server', () => {

  it('GET request should return an entry from the server', () => {
   	axios.get('http://127.0.0.1:2000/')
	  .then((response, err) => {
	  	response.should.be.a('object');
	  })
	  .catch((error) => {
	    console.error(error);
	  });
    
  });
});


setTimeout(()=>{process.exit('process ended')}, 5000);