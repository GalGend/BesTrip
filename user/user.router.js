var express = require('express');
var router = express.Router();
var UserController =  require('./user.controller');

/* GET users listing. */
router.get('/:id', UserController.getUserById);
router.post('/loginUser', UserController.loginUser);
router.get('/:userId/trips', UserController.getUserTrips);

module.exports = router;
