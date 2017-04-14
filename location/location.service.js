var _ = require('underscore');
var Promise = require('bluebird');
var Request = require('request-promise');
var SiteCategory = require("../common/db-access").models.siteCategory;

var GooglePlaces = require('google-places');
var places = new GooglePlaces(process.env.GGL_API_KEY)
var foursquare = Promise.promisifyAll(require('node-foursquare-venues')(process.env.FRSQR_CLIENT_ID, process.env.FRSQR_CLIENT_SCRT))

var util = require('util');


let getCitySitesByCategory = function(cityId, categoryId){

	return Promise.props({
			cityData: _getSiteDataById(cityId), 
			siteCategory: _getCategoryById(categoryId)
		}).then(function(result) {
			// Checking that all data exist
			try{
			var coords = [result.cityData.result.geometry.location.lat,
						result.cityData.result.geometry.location.lng]
			var query = result.siteCategory[0]._doc.foursquareQuery;
			
			return searchSitesByQuery(query, coords);
		}
		catch(err){
			console.error("Error performing getting sites by city and category id: " +err)
			throw "Error performing getting sites by city and category id: " + err;
		}
		});

	return searchSitesByQuery(query, location)
}
let searchSitesByQuery=(query, location)=>{
	
	var filter={
		query:query, 
		ll:location[0]+","+location[1],
	}

	return Promise.promisify(foursquare.venues.search)(filter)
	.then((data)=>{
		return data.response.venues.map(_mapForSquareSites);
	})
}
let getAllSiteCategories = function(){
	return SiteCategory.find({});
}

let _getCategoryById = function(categoryId){
	return SiteCategory.find({_id:categoryId});
}
var getCitiesAutoComplete = function(searcText){
	// Generating the request to the google api
	var uri = _generateCityAutocompleteRequest(searcText);
	return Request({
		uri:uri,
		json:true
	})
	.then(function(data){
		return data.predictions.map(_mapCity)
	})
	.catch(function(err){
		console.log("Error performing autocomplete request to google "+err);
		throw "Error performing autocomplete request to google "+err;
	})
}

var _generateCityAutocompleteRequest = function(searcText){
	return _generateGoogleApiReq(process.env.GGL_CITIES_API_ADDR,{
		'input':searcText,
		'types':'(cities)'
	});
}

var _generateGoogleApiReq = function(baseAddr,params){
	if( process.env.GGL_API_KEY== undefined){
		console.error("GOOGLE API KEY wasnt found");
		throw "environment variables were'nt found"
	}
	var req = baseAddr;
	req+='?';
	params.key = process.env.GGL_API_KEY;

	Object.keys(params).forEach((key) => {
   		 req+='&'+key+'='+params[key];    
	});

	return req;
}

let _mapForSquareSites = (site)=>{
	return {
		name:site.name,
		placeId:site.id,
	}
}

var _mapCity = (city) =>{
	return {
		id:city.id,
		placeId:city.place_id, 
		mainText:city.structured_formatting.main_text,
		secondaryText:city.structured_formatting.secondary_text
	}
}

var _getSiteDataById = (siteId)=>{
	var uri = _generateGoogleApiReq(process.env.GGL_SITES_API_ADDR, {placeid:siteId});
	return Request({
		uri:uri,
		json:true
	})
}
var getSiteDataById = (siteId)=>{
	return Promise.promisify(foursquare.venues.venue)(siteId).then((data)=>{
		return _mapFoursquaresite(data.response.venue);
	})


}
let _mapFoursquaresite = (site)=>{
	var photos=[];
	if (!_.isUndefined(site.photos.groups[0])){
		_.each(site.photos.groups[0].items, (photoItem)=>{
			photoUrl = photoItem.prefix+ 'width'+photoItem.width+photoItem.suffix;
			photos.push(photoUrl);
		})
	}
	return{
		placeId:site.id,
		name:site.name,
		rating:site.rating,
		description:site.description,
		photos:photos
	}
}
module.exports={
	getCitiesAutoComplete:getCitiesAutoComplete,
	getAllSiteCategories:getAllSiteCategories,
	getCitySitesByCategory:getCitySitesByCategory,
	getSiteById:getSiteDataById
}
	
