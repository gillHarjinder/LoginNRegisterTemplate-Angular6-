var express = require('express');
var router = express.Router();
var passport = require('passport');
var jwt = require('jsonwebtoken');


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
  res.send('AUTHENTICATE');
});

// Profile
router.get('/profile', (req, res, next) => {
  res.send('PROFILE');
});



module.exports = router;