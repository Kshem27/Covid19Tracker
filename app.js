const express = require('express');
const requestPromise = require('request-promise');
const PORT = process.env.PORT || 3000;
var app = express();
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
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
app.listen(PORT, () => {
	console.log(`Server has started at ${PORT}`);
});
