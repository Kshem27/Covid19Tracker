const express = require('express');
const requestPromise = require('request-promise');
const PORT = process.env.PORT || 3000;
var app = express();
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(function(request, response, next) {
	response.header('Access-Control-Allow-Origin', '*');
	response.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
	next();
});
app.get('/', (req, res) => {
	var s = req.query.state;
	requestPromise('https://api.covid19india.org/data.json')
		.then((body) => {
			var parsedData = JSON.parse(body);
			res.render('results', { allData: parsedData, stateName: s });
		})
		.catch((err) => {
			console.log(`Error : ${err.message}`);
		});
});
app.get('/states', (req, res) => {
	requestPromise('https://api.covid19india.org/data.json')
		.then((body) => {
			var parsedData = JSON.parse(body);
			res.render('states', { allData: parsedData });
		})
		.catch((err) => {
			console.log(`Error : ${err.message}`);
		});
});
app.get('/data', (req, res) => {
	requestPromise('https://api.covid19india.org/data.json')
		.then((body) => {
			var parsedData = JSON.parse(body);
			res.json(parsedData);
		})
		.catch((err) => {
			console.log(`Error : ${err.message}`);
		});
});
app.get('/weatherdata/:city', (req, res) => {
	let { city } = req.params;
	requestPromise(
		'http://api.weatherapi.com/v1/forecast.json?key=aeecf0a0fae54afb81b211752211711&q=' +
			city +
			'&days=10&aqi=no&alerts=no'
	)
		.then((body) => {
			// console.log(
			// 	'http://api.weatherapi.com/v1/forecast.json?key=aeecf0a0fae54afb81b211752211711&days=10&aqi=no&alerts=no&q=' +
			// 		city
			// );
			var parsedData = JSON.parse(body);
			res.json(parsedData);
		})
		.catch((err) => {
			console.log(`Error : ${err.message}`);
		});
});
app.listen(PORT, () => {
	console.log(`Server has started at ${PORT}`);
});
