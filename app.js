process.on('uncaughtException', function (exception) {
  console.log(exception); // to see your exception details in the console
  // if you are on production, maybe you can send the exception details to your
  // email as well ?
});

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors');
var app = express();


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
//app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());


//var index = require('./routes/index');s
var users = require('./user/user.router');
var locations = require('./location/location.router');
var trips = require('./trip/trip.router');
//var tripPrefences = require('./trip-prefences/trip-prefences.router');

//app.use('/', index);
app.use('/user', users);
app.use('/location', locations); 
app.use('/trip', trips); 
//app.use('/trip-prefences', tripPrefences); 

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
});


app.listen(5858, function () {
  console.log('-----------------------------------------')
  console.log('--------BesTrip Server is now up---------')
  console.log('-----------------------------------------')
  // Setting the env var
  // Checking the env vars
  if(process.env.MONGO_CONN_STR === undefined ||
  process.env.GGL_CITIES_API_ADDR === undefined ||
  process.env.GGL_SITES_API_ADDR === undefined ||
  process.env.GGL_API_KEY === undefined )
  {
    console.log ("env vars are missing!");
    process.env.MONGO_CONN_STR =   "mongodb://admin:admin@ds137530.mlab.com:37530/bestrip";
    process.env.GGL_CITIES_API_ADDR ="https://maps.googleapis.com/maps/api/place/autocomplete/json";
    process.env.GGL_API_KEY = "AIzaSyCZfV1JbQ6R4URxw3XPQAMyQrGhfNUoTTw";
    process.env.GGL_SITES_API_ADDR = "https://maps.googleapis.com/maps/api/place/details/json"
  }
})

module.exports = app;
