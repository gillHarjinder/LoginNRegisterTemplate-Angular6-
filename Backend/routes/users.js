var express = require('express');
var router = express.Router();
var passport = require('passport');
var jwt = require('jsonwebtoken');
var config = require('../config/database');

var User = require('../models/user');


// Register
router.post('/register', (req, res, next) => {
  let newUser = new User({
      name: req.body.name,
      email: req.body.email,
      username: req.body.username,
      password: req.body.password
  });


  User.addUser(newUser, (err, user) => {
    if(err){
      res.json({
        success: false,
        msg:'Failed to Register User'
      });
    } else {
      res.json({
        success: true,
        msg:'User Created'
      });
    }
  })

});

// Authenticate
router.post('/authenticate', (req, res, next) => {
  var username = req.body.username;
  var password = req.body.password;

  User.getUserByUsername(username, (err, user) => {
    if(err) throw err;

    // if user not found
    if(!user){
      return res.json({
        success: false,
        msg:'User not found'
      });
    }

    // if there is user then compare password
    User.comparePassword(password, user.password, (err, isMatch) => {
      if(err) throw err;
      if(isMatch){
        var token = jwt.sign({data: user}, config.secret, {
          expiresIn: 604800 // one week
        });
        // sending tokken and data if match
        res.json({
          success: true,
          tokken: 'JWT '+token,
          user: {
            if: user._id,
            name: user.name,
            username: user.username,
            email: user.email
          }
        });
      } else {
        return res.json({
          success: false,
          msg: 'Wrong password'
        });
      }
    })
  })
});

// Profile
router.get('/profile', passport.authenticate('jwt', 
{session:false}), (req, res, next) => {
  res.json({user: req.user});
});



module.exports = router;