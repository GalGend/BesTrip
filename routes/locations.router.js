var express = require('express');
var router = express.Router();
var locationProvider = require('../services/location.service')

/* GET users listing. */
router.get('/autocomplete/:text', function(req, res, next) {
	var text = req.param('text'); 
	if (typeof text === undefined)
		res.status(400).send({error:'text not found'}); 
	else{
		locationProvider.getCitiesAutoComplete(text)
		.then(function(data){
			res.status(200).json(data);
		})
		.catch(function(err){
			res.status(500).send({error:'Error getting city autocomplete'});
		})
	}
});

module.exports = router;
