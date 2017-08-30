#!/usr/bin/env node

'use strict';

const chalk = require('chalk');
const geoip = require('geoip-lite');

const Promise = require("bluebird");
const getIP = Promise.promisify(require('external-ip')());
const request = Promise.promisify(require("request"));

const apiKey = `64ead4818be5e06a1768c92eac673e33`;

getIP().then( ip => {
	const geo = geoip.lookup(ip); // get the user's external ip address
	return generateQuery(geo);
}).then( res => {
	return request(res); // make the api call using request
}).then( res => {
	let info = JSON.parse(res.body); // parse the response and convert it to JSON

	let name = info.name;
	let temp = info.main.temp;
	let wind = info.wind.speed;
	let humidity = info.main.humidity;
	let conditions = info.weather[0].main
	/*let icon = info.weather[0].icon;*/

	// Can use `info.name` or `location` for showing the user's location in the console log statements
	// Log the information in a pretty format

	console.log(
		chalk.bgBlue(` Weather in ${name} `) +
			chalk.bgGreen.blue('') +
			chalk.bgGreen(` ${Math.floor(temp)}°F `) +
			chalk.bgKeyword('orange').green('') +
			chalk.bgKeyword('orange')(chalk.black(` Wind: ${wind} mph `)) +
			chalk.bgRed.keyword('orange')('') +
			chalk.bgRed(` Humidity: ${humidity}% `) +
			chalk.bgWhite.red('') +
			chalk.bgWhite.black(` Condition is: ${conditions} `) +
			chalk.white(``) +
			chalk.black('')
	);

}).catch( err => {
	console.log(chalk.red(err));
});

function generateQuery(geo) {
	const arg = process.argv.slice(2)[0];
	const zipRegex = new RegExp(/(^\d{5}$)|(^\d{5}-\d{4}$)/);
	// If the user passed in an arg, try and parse it
	if (!!arg) {
		if (zipRegex.test(arg)) {
			return `http://api.openweathermap.org/data/2.5/weather?zip=${arg},${geo.country.toLowerCase()}&units=imperial&APPID=${apiKey}`; // generate the query string for the api
		} else {
			console.log(`Parameter '${arg}' not understood, falling back to your location`)
		}
	}
	// Fallback to using zipcode from geo
	return `http://api.openweathermap.org/data/2.5/weather?zip=${geo.zip},${geo.country.toLowerCase()}&units=imperial&APPID=${apiKey}`; // generate the query string for the api
}
