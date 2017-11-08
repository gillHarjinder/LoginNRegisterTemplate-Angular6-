var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');
var path = require('path');
var config = require('./config');

app.get('*', function(req, res) {
	res.json({
		message: "hello Brandon"
	})
});

app.listen(config.port);
console.log('Server is running on port ' + config.port);