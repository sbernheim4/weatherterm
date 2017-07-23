'use strict';

const chalk = require('chalk');
const geoip = require('geoip-lite');

const Promise = require("bluebird");
const getIP = Promise.promisify(require('external-ip')());
const request = Promise.promisify(require("request"));

const apikey = '64ead4818be5e06a1768c92eac673e33';
let location;

getIP()
.then( ip => {
	const geo = geoip.lookup(ip);
	location = geo.region;
	return `http://api.openweathermap.org/data/2.5/weather?zip=${geo.zip},${geo.country.toLowerCase()}&units=imperial&APPID=${apikey}`;
})
.then((res) => {
	return request(res);
})
.then(function(res) {
	let info = JSON.parse(res.body);

	// Can use `info.name` or `location` for showing the console log statements
	console.log(
		chalk.bgBlue(` Weather in ${info.name} => `) +
		chalk.bgGreen(` ${Math.floor(info.main.temp)}°F > `) +
		chalk.bgKeyword('orange')(chalk.black(` Wind: ${info.wind.speed} mph > `)) +
		chalk.bgRed(` Humidity: ${info.main.humidity}% `)
	);
})
.catch((err) => {
	console.log("AN ERROR WAS THROWN");
	console.log(chalk.red(err));
});
