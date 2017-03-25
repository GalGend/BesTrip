var express = require('express');
var router = express.Router();
var locationController = require('./location.controller')

/* GET users listing. */
router.get('/autocomplete/:text', locationController.autocompleteCities);

module.exports = router;
