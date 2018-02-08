const saveBooking = require('./queries.js').saveBooking;
const saveRide = require('./queries.js').saveRide;
const saveLogin = require('./queries.js').saveLogin;

//[37.783783, -122.4114007]

const zips = {
  94102: [783783, 4114007],
  94103: [7793322, 4341587],
  94104: [793186, 4036837],
  94105: [788722, 3985992],
  94107: [7556837, 4021276],
  94108: [7909771, 4179006],
  94109: [805056, 4281884],
  94110: [7486943, 4325716],
  94111: [7991221, 4062223],
  94112: [7215472, 4598041],
  94114: [7616271, 4374621],
  94115: [7861432, 4556077],
  94116: [7483257, 4989142],
  94117: [7687991, 4627462],
  94118: [7788482, 4791112],
  94121: [7772111, 5123031],
  94122: [7637942, 4711964],
  94123: [8007141, 4565512],
  94124: [717172, 3965978],
  94127: [7364347, 4750097],
  94129: [7989022, 4841773],
  94131: [7461683, 4523647],
  94132: [7218297, 5029057],
  94133: [8069357, 415765],
  94134: [71795, 424504],
  94143: [764281, 4579149],
  94158: [7674991, 3934175]
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
  console.log(`current iteration: ${i} / 200`);

  let end = users + increment;
  for (let j = users; j < end; j++) {

    if(id > 10000000) { return }

    let user_id = j;
    let user_zip;
    let user_lat;
    let user_lon;
    let user_date_ms;

    for (let k = 0; k < 5; k++) {
      let driver_id = randomDriver();

      let loc_zip =  randomZip();
      let loc =   generateLocation(loc_zip);
      let loc_lat =  loc[0];
      let loc_lon =  loc[1];

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

      console.log(`queued saveRide id:${id}`);
      saveRide(id, small_loc_zip, loc_lat, loc_lon, small_dest_zip, dest_lat, dest_lon, driver_id).then(()=>{console.log(`wrote saveRide id:${id}`)}
        );
      }

      console.log(`queued saveBooking id:${id}`);
      saveBooking(user_id, price, date_ms).then(()=>{console.log(`queued saveBooking id:${id}`)});
      
      id ++;
    }
  }

  users += increment;
  i++;

  if (id < 10000000) {
    setTimeout(function(){ generateBooking(users) }, 45000);

  } else { 
    console.log("10M writes successfully queued to the database");
    return;
  }
}

let i = 1;
let id = 1;
let users = 1;
let increment = 10000;

generateBooking(users)