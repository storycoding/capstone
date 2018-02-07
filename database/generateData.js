const saveBooking = require('./queries.js').saveBooking;
const saveRide = require('./queries.js').saveRide;
const saveLogin = require('./queries.js').saveLogin;

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

  return (100 * (Math.random() * (max - min) / 2 * rate + 3)).toFixed();
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

    if(id > 10000000) { return }

    let user_id = j;
    let user_zip;
    let user_lat;
    let user_lon;
    let user_date_ms;

    for (let k = 0; k < 5; k++) {
      let driver_id = randomDriver();

      let loc_zip = dest_zip || randomZip();
      let loc = dest_zip || generateLocation(loc_zip);
      let loc_lat = dest_lat || loc[0];
      let loc_lon = dest_lon || loc[1];

      let dest_zip = randomZip();
      let dest = generateLocation(dest_zip);
      let dest_lat = dest[0];
      let dest_lon = dest[1];

      let rate = randomRate();
      let price = randomPrice(rate, loc_zip, dest_zip);

      //multiply by 1000 on read to get real date
      let date_ms = Math.floor(Date.now()/1000 - (5 - k) * 100000 + Math.floor(Math.random() * 5000));

      //console.log("user_id = " + user_id + "\nbooking date_ms = " + new Date(date_ms *1000));

      // remember to add 94100 when reading
      let small_loc_zip = loc_zip - 94100;
      let small_dest_zip = dest_zip - 94100;

      saveRide(id, small_loc_zip, loc_lat, loc_lon, small_dest_zip, dest_lat, dest_lon, driver_id, user_id);

      saveBooking(user_id, price, date_ms);

      //user stays at the last booking location & date_ms
      if (k === 4) {
        user_zip = small_dest_zip;
        user_lat = dest_lat;
        user_lon = dest_lon;
        user_date_ms = date_ms;

        saveLogin(user_id, user_zip, user_lat, user_lon, user_date_ms);
      }

      id ++;
    }

    id ++;    
  }
    
  console.log(`finished queueing: ${i}`)

  i++;

  start += increment;
  users += increment;

  if (id < 10000000) {
    setTimeout(function(){ generateBooking(users); }, 45000);

  } else { return }
}

let increment = 10000;
let start = 0;
let i = 0;
let id = 0;
let users = 10000;

generateBooking(users)