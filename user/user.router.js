var express = require('express');
var router = express.Router();
var UserController =  require('./user.controller');

/* GET users listing. */
router.get('/:id', UserController.getUserById);
router.post('/addNewUser', UserController.addNewUser);
router.get('/:userId/trips', UserController.getUserTrips);

module.exports = router;
