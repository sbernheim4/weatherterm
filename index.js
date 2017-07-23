'use strict';

const Promise = require("bluebird");

const getIP = require('external-ip')();
const getIPTwo = Promise.promisify(require('external-ip')());
const geoip = require('geoip-lite');

const request = Promise.promisify(require("request"));

const chalk = require('chalk');


const apikey = '64ead4818be5e06a1768c92eac673e33';

getIPTwo()
.then( ip => {
	const geo = geoip.lookup(ip);
	return `http://api.openweathermap.org/data/2.5/weather?zip=${geo.zip},${geo.country.toLowerCase()}&units=imperial&APPID=${apikey}`;
})
.then((res) => {
	return request(res);
})
.then(function(res)  {
	let info = JSON.parse(res.body);

	console.log(
		chalk.bgBlue(` Weather in PLACEHOLDER => `) +
		chalk.bgGreen(` ${Math.floor(info.main.temp)}°F > `) +
		chalk.bgKeyword('orange')(chalk.black(` Wind: ${info.wind.speed} mph > `)) +
		chalk.bgRed(` Humidity: ${info.main.humidity}% `)
	);
})
.catch((err) => {
	console.log("AN ERROR WAS THROWN");
	console.log(chalk.red(err));
});
