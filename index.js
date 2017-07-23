'use strict';

const getIP = require('external-ip')();
const geoip = require('geoip-lite');
const request = require('request');

const apikey = '64ead4818be5e06a1768c92eac673e33';

getIP((err, ip) => {
    if (err) throw err;

	const geo = geoip.lookup(ip);
	console.log(geo.zip);

	const queryString = `http://api.openweathermap.org/data/2.5/weather?zip=${geo.zip},${geo.country.toLowerCase()}&APPID=${apikey}`;

	request.get(queryString, (err, res, body) => {
		if (err) throw err;

		console.log(JSON.parse(body));
	});
});



