var locationsService = require('./location.service');
var baseController = require('../common/base.controller')

let autocompleteCities=(res, req)=>{
	console.log('Autocomplete request ');
    var text = req.param('text'); 
	if (typeof text === undefined)
    baseController.handleBadRequestError("autocomplete search text wasn't found")

	else{
		try{
		locationProvider.getCitiesAutoComplete(text)
		.then(baseController.createDataHandler(res))
		.catch(baseController.createErrorHandler(res, "Cities autocomplete error"))
		}
		catch(error){
			console.log("Internal error perforing the auto complete request")
			console.log(error);
		}
	}
}

let test = (res, req)=>{
	console.log('test');
	res.status(200).json({test:"test"});
}

module.exports = {
    autocompleteCities:autocompleteCities,
	test:test
}