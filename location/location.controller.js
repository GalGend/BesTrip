var locationsService = require('./location.service');
var baseController = require('../common/base.controller')

let autocompleteCities=(req, res)=>{
	console.log('Autocomplete request ');
    var text = req.param('text'); 
	if (typeof text === undefined)
    	baseController.handleBadRequestError("autocomplete search text wasn't found")

	else{
		try{
		locationsService.getCitiesAutoComplete(text)
		.then(baseController.createDataHandler(res))
		.catch(baseController.createErrorHandler(res, "Cities autocomplete error"))
		}
		catch(error){
			console.log("Internal error perforing the auto complete request")
			console.log(error);
			baseController.createErrorHandler(res, "Cities autocomplete error")(error);
		}
	}
}

module.exports = {
    autocompleteCities:autocompleteCities,
}