var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var User = require('../models/user');
var config = require('../config/database');

/**
 * This module lets you authenticate endpoints using 
 * a JSON web token. It is intended to be used to 
 * secure RESTful endpoints without sessions.
 * payload: it include user info
 * opts: options
 * find this at:
 * https://www.npmjs.com/package/passport-jwt
 */
module.exports = function(passport){
    let opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt");
    opts.secretOrKey = config.secret;
    passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
        console.log(jwt_payload)
      User.getUserById(jwt_payload.data._id, (err, user) => {
        if(err){
          return done(err, false);
        }
        if(user){
          return done(null, user);
        } else {
          return done(null, false);
        }
      });
    }));
  }