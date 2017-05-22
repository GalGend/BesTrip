var locationsService = require('./location.service');
var baseController = require('../common/base.controller')
var _ = require('underscore');

let autocompleteCities=(req, res)=>{
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
			baseController.createErrorHandler(res, "Cities autocomplete error")(error);
		}
	}
}

let autocompleteHotels=(req, res)=>{
    var text = req.param('text'); 
	var city = req.param('cityId');
	if (typeof text === undefined)
    	baseController.handleBadRequestError("hotels autocomplete search text wasn't found- bad params")

	else{
		try{
		locationsService.getCitiesAutoComplete(text)
		.then(baseController.createDataHandler(res))
		.catch(baseController.createErrorHandler(res, "hotels autocomplete error"))
		}
		catch(error){
			baseController.createErrorHandler(res, "hotels autocomplete error")(error);
		}
	}
}

let getAllSiteCategories=(req, res)=>{
	console.log('site categories request');
	try{
		locationsService.getAllSiteCategories()
		.then(baseController.createDataHandler(res))
		.catch(baseController.createErrorHandler(res, "site categories error"))
	}
	catch(error){
			baseController.createErrorHandler(res, "site categories error")(error);
	}
}

let getCitySitesByCategory = (req, res) =>{
	try{
		var cityId = req.query.cityId;
		var categoryIds = req.query.categoryIds;
		if (_.isUndefined(cityId)|| _.isUndefined(categoryIds)){
			baseController.handleBadRequestError("city sites by categories bad params")
		}
	}
	catch(err){
		baseController.handleBadRequestError("city sites by categories bad params")
	}
	try{
		// splitting the ids into an array
		var cats = categoryIds.split(',');
		locationsService.getCitySitesByCategory(cityId, cats)
		.then(baseController.createDataHandler(res))
		.catch(baseController.createErrorHandler(res, "City sites by category error"))
	}
	catch(error){
			baseController.createErrorHandler(res, "city sites by category error")(error);
	
	}
}

let getSiteById = (req, res)=>{
	// Checking parameter
	var siteId= req.params.siteId;

	try{
		locationsService.getSiteById(siteId)
		.then(baseController.createDataHandler(res))
		.catch(baseController.createErrorHandler(res, "Get Site By Id error"))
	}
	catch(error){
			baseController.createErrorHandler(res, "Get site By id error")(error);
	
	}
}

module.exports = {
    autocompleteCities:autocompleteCities,
	getAllSiteCategories:getAllSiteCategories,
	getCitySitesByCategory:getCitySitesByCategory,
	getSiteById:getSiteById
}