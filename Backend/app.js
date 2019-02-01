
// all the modules
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var cors = require('cors');
var passport = require('passport');
var mongoose = require('mongoose');
var config = require('./config/database')



// this is connecting to the mongo data base
mongoose.connect(config.database, { useNewUrlParser: true });

// varify weather it connected 
mongoose.connection.on('connected', () => {
  console.log('Connected to database '+config.database);
})


// if there is ERROR in connecting database
mongoose.connection.on('ERROR', (err) => {
  console.log('Database connection err '+err);
})


// Init App
var app = express();



//Bringing users routes from ROUTES folder
var users = require('./routes/users');



/**
 * it help to request to API from diff. Domain Name
 * by default it block if u not allow
 * CORS Middleware
 */
app.use(cors());


/**
 * Setup a static folder the folder so it can be 
 * connect with front end
 */
app.use(express.static(path.join(__dirname, 'public')));



//Body-parser Middleware: it parser incoming body request
app.use(bodyParser.json());


// passport Middleware
app.use(passport.initialize());
app.use(passport.session());


// including the jwt tokken file
require('./config/passport')(passport);



// anything after ...3333/users/x goes here
app.use('/users', users);




// for check purposes
app.get('/', (req, res) => {
  res.send('Invalid endpoit');
})

// Set Port
var port = 3333;

app.listen(port, function(){
	console.log('Server running at http://localhost:'+port);
});

