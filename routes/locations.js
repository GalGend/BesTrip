var express = require('express');
var router = express.Router();
var locationProvider = require('../data/locationProvider')

/* GET users listing. */
router.get('/:text', function(req, res, next) {
	var text = req.param('text'); 
	if (typeof text === undefined)
		res.status(400).send({error:'text not found'}); 
	else{
		var locations = locationProvider.getLocations(text); 
	 	res.send(locations);
	}
});

module.exports = router;
