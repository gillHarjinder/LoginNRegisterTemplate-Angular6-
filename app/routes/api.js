var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
var sh = require('shorthash');
var path = require('../models/user');
var User = require('../models/area');
var Area = require('../models/area');
var config = require('../../config');
var secret = config.secret;

module.exports = function(app, express){

	var apiRouter = express.Router();

	apiRouter.get('/', function(req, res){
		apiRouter.sendResponse(res, true, 'This is API root!');
	});


	apiRouter.post('/registerUser', function(req, res){
		if(req.body.username && req.body.password){
			var user = new User();
			user.username = req.body.username;
			user.password = req.body.password;
			user.isAvaliable = false;
			user.save(function(err){
				
			});
		}
	});
};