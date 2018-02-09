const axios = require('axios');

// fares
axios.get('faresDestination',{
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
axios.get('driversDestination',{
    params: {
      loc_zip: 2,
      loc_lat: 783783,
      loc_lon: 4114007,
      date_ms: 1517558740
    }
  }).then(function (response, err) {
    console.log(response);

}).catch(function(err) {
  console.error(err);
});

// events
axios.post('eventsDestination',{
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