var express = require('express');
var router = express.Router();
var locationController = require('./location.controller')

/* GET users listing. */
router.get('/autocomplete/:text', locationController.autocompleteCities);
router.get('/test', locationController.test);

module.exports = router;
