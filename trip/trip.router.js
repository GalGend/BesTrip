var express = require('express');
var router = express.Router();
var TripController =  require('./trip.controller');

/* GET users listing. */
 router.get('/:tripId', TripController.getTripById);
 router.get('/:tripId/days/:dayIndex', TripController.getTripDayByIndex);

// router.post('/addNewUser', UserController.addNewUser);

module.exports = router;
