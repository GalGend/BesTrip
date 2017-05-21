var tripService = require('./trip.service');
var baseController = require('../common/base.controller');

var getTripById = function(req, res){
    try{
		var tripId = req.params.tripId;
		if ((tripId===undefined)){
			baseController.handleBadRequestError("Get trip by id bad params")
		}
	}
	catch(err){
		baseController.handleBadRequestError("Get trip by id bad params")
	}
	try{
		tripService.getTripById('58fa5bf865002073b1d2b244')
		.then(baseController.createDataHandler(res))
		.catch(baseController.createErrorHandler(res, "Get trip By id Internal error"))
	}
	catch(error){
			baseController.createErrorHandler(res, "Get trip By id Internal error")(error);
	
	}
}
var getTripDayByIndex = function(req,res){
    try{
		var tripId = req.params.tripId;
        var dayIndex=req.params.dayIndex
		if ((tripId===undefined|| dayIndex===undefined)){
			baseController.handleBadRequestError("Get trip day by id bad params")
		}
	}
	catch(err){
		baseController.handleBadRequestError("Get trip day by id bad params")
	}
	try{
		tripService.getTripDayByIndex(tripId, dayIndex)
		.then(baseController.createDataHandler(res))
		.catch(baseController.createErrorHandler(res, "Get trip day By id Internal error"))
	}
	catch(error){
			baseController.createErrorHandler(res, "Get trip day By id Internal error")(error);
	
	}
}
module.exports={
    getTripById:getTripById,
    getTripDayByIndex:getTripDayByIndex
}