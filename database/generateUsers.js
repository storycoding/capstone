const saveLogin = require('./queries.js').saveLogin;
const fs = require('fs');

const destination = `./passengerData/users1.txt`;
const writeStream = fs.createWriteStream(destination);
const count = 1000000; // number of entries per file

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

const generateUserData = (count) => {

	for (var i = 0; i < count; i++) {
		writeStream.write(`${generateLocation()},${generateLocation()}\n`);
	}
}

const randomZip = () => {
	let keys = Object.keys(zips);
	let randomIndex = Math.floor(Math.random() * (keys.length));
	let key = keys[randomIndex];
	return key;
}

const generateLocation = () => {
	let code = randomZip();
	let lat = zips[code][0];
	let lon = zips[code][1];

	return [code,lat,lon];
};

generateUserData(count);

/*
generate 10 * count files // needs promises
for (var i = 0; i < 10; i++) {
	let destination = `./passengerData/passengers${i}.txt`
	let writeStream = fs.createWriteStream(destination);
	generateUserData(count);
}
*/

/*
process.on('exit', function() {  
    return console.log(`${count} users generated`);
});

process.exit();
*/

//console.log(`zipCode = ${code}\nlat = ${lat}\nlon = ${lon}`);

// san francisco range
// 37.784392 / 37.709100
// -122.510102 / -122.388737

/*
zips without an actual area
const weirdZips = {
	94126: [ , ],
	94139: [ , ],
	94151: [ , ],
	94159: [ , ],
  	94177: [ , ],
  	94188: [ , ]
}
*/

/*
const randomLon = () => {
	let random = Math.floor(Math.random() * (784392 - 709100 + 1)) + 709100
	let lon = 37000000 + random;
	return lon;
}

const randomLat = () => {
	let random = Math.floor(Math.random() * (510102 - 388737 + 1)) + 388737
	let lat = (122510102 - random);
	return lat;
}
*/