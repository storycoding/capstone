const saveBooking = require('./queries.js').saveBooking;

const fs = require('fs');

const zips = {
  94102: [37.783783, -122.4114007],
  94103: [37.7793322, -122.4341587],
  94104: [37.793186, -122.4036837],
  94105: [37.788722, -122.3985992],
  94107: [37.7556837, -122.4021276],
  94108: [37.7909771, -122.4179006],
  94109: [37.805056, -122.4281884],
  94110: [37.7486943, -122.4325716],
  94111: [37.7991221, -122.4062223],
  94112: [37.7215472, -122.4598041],
  94114: [37.7616271, -122.4374621],
  94115: [37.7861432, -122.4556077],
  94116: [37.7483257, -122.4989142],
  94117: [37.7687991, -122.4627462],
  94118: [37.7788482, -122.4791112],
  94121: [37.7772111, -122.5123031],
  94122: [37.7637942, -122.4711964],
  94123: [37.8007141, -122.4565512],
  94124: [37.717172, -122.3965978],
  94127: [37.7364347, -122.4750097],
  94129: [37.7989022, -122.4841773],
  94131: [37.7461683, -122.4523647],
  94132: [37.7218297, -122.5029057],
  94133: [37.8069357, -122.415765],
  94134: [37.71795, -122.424504],
  94143: [37.764281, -122.4579149],
  94158: [37.7674991, -122.3934175]
}

const randomRate = () => {
  return Math.floor(Math.random() * (8) + 1);
}

const randomPrice = (rate, loc_zip, dest_zip) => {
  if (loc_zip < dest_zip) {
    var min = loc_zip;
    var max = dest_zip;

  } else {
    var max = loc_zip;
    var min = dest_zip;
  }

  return (Math.random() * (max - min) / 2 * rate + 3).toFixed(2);
}

const randomDriver = () => {
  return (0000000 + Math.floor(Math.random() * (10000001)));
}

const randomZip = () => {
  let keys = Object.keys(zips);
  let randomIndex = Math.floor(Math.random() * (keys.length));
  let key = keys[randomIndex];
  return key;
}

const generateLocation = (code) => {
  let lat = zips[code][0];
  let lon = zips[code][1];
  return [lat,lon];
};


const generateBooking = (users) => {
  console.log(`current iteration: ${i}`)
  let streams = {};


  for (let j = start; j < users; j++) {
    let user_id = j;

    for (var k = 0; k < 5; k++) {
      var driver_id = randomDriver();

      var loc_zip = dest_zip || randomZip();
      var loc = dest_zip || generateLocation(loc_zip);
      var loc_lat = dest_lat || loc[0];
      var loc_lon = dest_lon || loc[1];

      var dest_zip = randomZip();
      var dest = generateLocation(dest_zip);
      var dest_lat = dest[0];
      var dest_lon = dest[1];

      var rate = randomRate();
      var price = randomPrice(rate, loc_zip, dest_zip);

      let booking = `${user_id},${driver_id},${loc_zip},${loc_lat},${loc_lon},${dest_zip},${dest_lat},${dest_lon},${rate},${price}\n`;
      console.log(booking);
      //saveBooking(user_id, driver_id, loc_zip, loc_lat, loc_lon, dest_zip, dest_lat, dest_lon, rate, price);
    }
    
  }
    
  i++;
  start += increment;
  users += increment;


  if (i < 20) {
    setTimeout(function(){ generateBooking(users); }, 3000000); // 100000 per minute // 3000000
  } else {
    return;
  }

}

let increment = 100000;

let i = 0;
let start = 0;
let users = 100000;

generateBooking(users)

