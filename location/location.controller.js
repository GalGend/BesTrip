var locationsService = require('./location.service');
var baseController = require('../common/base.controller')

let autocompleteCities=(res, req)=>{
	console.log('Autocomplete request ');
    var text = req.param('text'); 
	if (typeof text === undefined)
    baseController.handleBadRequestError("autocomplete search text wasn't found")

	else{
		locationProvider.getCitiesAutoComplete(text)
		.then(baseController.createDataHandler(res))
		.catch(baseController.createErrorHandler(res, "Cities autocomplete error"))
	}
}

module.exports = {
    autocompleteCities:autocompleteCities
}