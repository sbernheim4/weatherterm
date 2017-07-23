'use strict';

const getIP = require('external-ip')();
const geoip = require('geoip-lite');
const request = require('request');

const apikey = '64ead4818be5e06a1768c92eac673e33';

let ipAddress;

getIP((err, ip) => {
    if (err) throw err;

	var geo = geoip.lookup(ip);

	const country = geo.country.toLowerCase();
	request.get(`http://api.openweathermap.org/data/2.5/weather?q=London&APPID=${apikey}`, (err, res, body) => {
		if (err) throw err;
		console.log('body is', JSON.parse(body));
	})
});



