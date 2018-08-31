var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var config = require('../config/database');


// User Schema
var UserSchema = mongoose.Schema({
    name: {
		type: String
    },
    email: {
        type: String,
        require: true
	},
    username: {
		type: String,
		require: true
	},
	password: {
        type: String,
        require: true
	}
	
});

// creating variable which is accesseble from ouside from this file

var User = module.exports = mongoose.model('User', UserSchema);

// get user by username
module.exports.getUserByUsername = function(username, callback){
	var query = {username: username};
	User.findOne(query, callback);
}


// get user by ID
module.exports.getUserById = function(id, callback){
	User.findById(id, callback);
}

/**
 * to create the user
 * 'genSalt' is random key generation, to use hash the password
 * to hash the password, i get the code from:
 *  https://www.npmjs.com/package/bcryptjs
 */
module.exports.addUser = function(newUser, callback){
	bcrypt.genSalt(10, function(err, salt) {
	    bcrypt.hash(newUser.password, salt, function(err, hash) {
            if(err) throw err;
            newUser.password = hash;
	        newUser.save(callback);
	    });
	});
}



// code inside gets from:
//		https://www.npmjs.com/package/bcryptjs 
//		[Tp check a password] section
// 	This function campare the password from DB
module.exports.comparePassword = function(candidatePassword, hash, callback){
	bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
    	if(err) throw err;
    	callback(null, isMatch);
});
}

