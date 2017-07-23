#!/usr/bin/env node

'use strict';

require('dotenv').config();

const chalk = require('chalk');
const geoip = require('geoip-lite');

const Promise = require("bluebird");
const getIP = Promise.promisify(require('external-ip')());
const request = Promise.promisify(require("request"));

let location;

getIP()
.then( ip => {
	const geo = geoip.lookup(ip); // get the user's external ip address
	location = geo.region;
	return `http://api.openweathermap.org/data/2.5/weather?zip=${geo.zip},${geo.country.toLowerCase()}&units=imperial&APPID=${process.env.OWM_API_KEY}`; // generate the query string for the api
})
.then((res) => {
	return request(res); // make the api call using request
})
.then(function(res) {
	let info = JSON.parse(res.body); // parse the response and convert it to JSON

	// Can use `info.name` or `location` for showing the user's location in the console log statements
	// Log the information in a pretty format
	console.log(
		chalk.bgBlue(` Weather in ${info.name} => `) +
		chalk.bgGreen(` ${Math.floor(info.main.temp)}°F > `) +
		chalk.bgKeyword('orange')(chalk.black(` Wind: ${info.wind.speed} mph > `)) +
		chalk.bgRed(` Humidity: ${info.main.humidity}% `)
	);
})
.catch((err) => {
	console.log(chalk.red(err));
});
