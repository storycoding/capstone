const axios = require('axios');
const helpers = require('./helpers');
// fares
axios.get('/requestfare',{
    params: {
      loc_zip: 2,
      loc_lat: 783783,
      loc_lon: 4114007,
      dest_zip: 17,
      dest_lat: 7687991,
      dest_lon: 4627462,
      date_ms: 1517558740
    }
  }).then(function (response, err) {
    console.log(response);

}).catch(function(err) {
  console.error(err);
});

// drivers
axios.get('/requestdriver',{
    params: {
      loc_zip: helpers.parseZip(2),
      loc_lat: helpers.parseLat(783783),
      loc_lon: helpers.parseLon(4114007),
      dest_zip: helpers.parseZip(17),
      dest_lat: helpers.parseLat(7687991),
      dest_lon: helpers.parseLon(4627462),
      date_ms: helpers.parseDate(1517558740)
    }
  }).then(function (response, err) {
    console.log(response);

}).catch(function(err) {
  console.error(err);
});

// events
axios.post('/bookinginfo',{
    params: {
      loc_zip: 2,
      dest_zip: 17,
      price : 989,
      rate : 8,
      accepted : true,
      date_ms: 1517558740,
    }
  }).then(function (response, err) {
    console.log(response);

}).catch(function(err) {
  console.error(err);
});