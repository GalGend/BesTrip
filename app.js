var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var app = express();


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
//app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//var index = require('./routes/index');
var users = require('./user/user.router');
var locations = require('./location/location.router');
//var trips = require('./trip/trip.router');
//var tripPrefences = require('./trip-prefences/trip-prefences.router');

//app.use('/', index);
app.use('/user', users);
app.use('/location', locations); 
//app.use('/trip', trips); 
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
  console.log('Example app listening on port 3000!')
  // Setting the env var
  process.env.MONGO_CONN_STR =   "mongodb://admin:admin@ds137530.mlab.com:37530/bestrip";
})

module.exports = app;
