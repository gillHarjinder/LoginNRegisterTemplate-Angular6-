var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
var sh = require('shorthash');
var path = require('path');
var User = require('../models/user');
var config = require('../../config');
var secret = config.secret;

module.exports = function(app, express){

	var apiRouter = express.Router();

	apiRouter.get('/', function(req, res){
		apiRouter.sendResponse(res, true, 'This is API root!');
	});

	// send data to server to register
	apiRouter.post('/registerUser', function(req, res){
		if(req.body.username && req.body.password){
			var user = new User();
			user.username = req.body.username;
			user.password = req.body.password;
			user.isAvaliable = false;
			user.save(function(err) {
				if(err){
					// this err code = 11000 means is look for duplicate
					if(err.code = 11000){
						apiRouter.sendResponse(res, false, 'A user with that name is already exist!');
					} else {
						apiRouter.sendResponse(res, false, err);
					}
				}else{
					apiRouter.sendResponse(res, true, 'User Created');
				}
			});
		} else {
			apiRouter.sendResponse(res, false, 'Please include a username and password');
		}
	});


	apiRouter.post('/authenticate', function(req, res){
		if(req.body.username && req.body.password){
			User.findOne({ username: req.body.username }).select('username password').exec(function(err, user){
				var pass = apiRouter.sendErrorIfErrorOrObjectNull(res, err, user, 'User with that username not found');
				if(pass) {
					var validPassword = user.comparePassword(req.body.password);
					if(!validPassword) {
						apiRouter.sendResponse(res, false, 'Wrong username or password');
					} else {
						var token = jwt.sign({
							username: user.username,
						}, secret, {
							expiresIn: 60*60*24
						});
						return res.json({
							success: true,
							message: 'Token created',
							token: token
						});
					}
				}
			});
		}else{
			apiRouter.sendResponse(res, false, 'Please include a username and password');
		}
	});

	// this is middleware
	apiRouter.use(function(req, res, next) {
		var token = req.body.token || req.query.token || req.headers['x-access-token'];
		if(token) {
			jwt.verify(token, secret, function(err, decoded) {
				if(err) {
					return res.status(403).send({
						success: false,
						message: 'Failed to authenticate token'
					});
				} else if(decoded) {
					User.findOne({ username: decoded.username }, function(err, user) {
						var pass = apiRouter.sendErrorIfErrorOrObjectNull(res, err, user, 'No user with that username found');
						if(pass) {
							req.user = user;
							next();
						}
					});
				} else {
					return res.status(403).send({
						success: false,
						message: 'Token invalid'
					});
				}
			});
		} else {
			res.status(403).send({
				success: false,
				message: 'No token provided'
			});
		}
	});




	// if data is not found then send this message
	apiRouter.sendErrorIfErrorOrObjectNull = function(res, err, obj, message) {
		if(err) {
			apiRouter.sendResponse(res, false, err);
			return false;
		} else if(obj == null) {
			apiRouter.sendResponse(res, false, message);
			return false
		}
		return true;
	};


	apiRouter.get('/me', function(req, res) {
		req.user.password = undefined;
		req.user._id = undefined;
		req.user.__v = undefined;
		return res.json({
			success: true,
			user: req.user
		});
	});


	apiRouter.sendResponse = function(res, success, message) {
		return res.json({
			success: success,
			message: message
		});
	};
	
};