'use strict';

const getIP = require('external-ip')();
const geoip = require('geoip-lite');
const request = require('request');
const chalk = require('chalk');

const apikey = '64ead4818be5e06a1768c92eac673e33';

getIP((err, ip) => {
    if (err) throw err;

	const geo = geoip.lookup(ip);

	const queryString = `http://api.openweathermap.org/data/2.5/weather?zip=${geo.zip},${geo.country.toLowerCase()}&units=imperial&APPID=${apikey}`;

	request.get(queryString, (err, res, body) => {
		if (err) throw err;

		let info = JSON.parse(body);

		console.log(
			chalk.bgBlue(`Weather in ${geo.region} => `) +
			chalk.bgGreen(` ${info.main.temp}°F > `) +
			chalk.bgRed(` Humidity: ${info.main.humidity}% > `) +
			chalk.bgWhite.black(` Wind: ${info.wind.speed} mph `)
		);

	});
});



