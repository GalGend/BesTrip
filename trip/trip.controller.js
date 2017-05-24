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
		tripService.getTripById(tripId)
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

var createNewTrip = function(req, res){
	// This function get all the params for the trip,
	// saves them on the db, then sends the params to the
	// trip planner- that return a trip plan -
	// then saves the trip plan to the db

	try{
		var newTripPerfences = getValidNewTripParams(req.body);
		if (newTripPerfences===undefined){
			baseController.handleBadRequestError("New Trip bad params")
		}
	}
	catch(err){
		baseController.handleBadRequestError("New Trip bad params")
	}
	try{
		tripService.saveNewTrip(newTripPerfences)
		.then(baseController.createDataHandler(res))
		.catch(baseController.createErrorHandler(res, "Create New Trip Internal error"))
	}
	catch(error){
			baseController.createErrorHandler(res, "Create New Trip Internal error")(error);
	
	}
}
module.exports={
    getTripById:getTripById,
    getTripDayByIndex:getTripDayByIndex,
	createNewTrip:createNewTrip
}

var getValidNewTripParams =(params)=>{
	// Need to get all the params from the params (req.params)
	// is sent to the function

	var fromDate = params.fromDate;
	var toDate = params.toDate;
	var destination = params.destination;
	var sitesToVisit = params.sites;
	var transport = params.transport;
	var accomodationPlaceId = params.accomodationPlaceId;
	var userId = params.userId;

	// Checking that all params exist and valid
	if (fromDate===undefined || toDate===undefined || destination===undefined
	|| sitesToVisit===undefined || sitesToVisit.length === undefined || transport=== undefined
	|| transport.length===undefined|| accomodationPlaceId===undefined || userId===undefined)

		return undefined;

		// stimulating new trip
	var trip = {
		name:"My Trip To "+ destination,
		dates : {
			from: new Date(fromDate),
			to: new Date(toDate)
		},
		user: userId, 
		accomodationPlaceId:accomodationPlaceId
	}

	return trip;
}