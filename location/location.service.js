var _ = require('underscore');
var Promise = require('bluebird');
var Request = require('request-promise');
var dbAccess = require("../common/db-access");
var SiteCategory = dbAccess.models.siteCategory;

var GooglePlaces = require('google-places');
var places = new GooglePlaces(process.env.GGL_API_KEY)
var foursquare = Promise.promisifyAll(require('node-foursquare-venues')(process.env.FRSQR_CLIENT_ID, process.env.FRSQR_CLIENT_SCRT))

var util = require('util');


let getCitySitesByCategory = function(cityId, categoryIds){

	return Promise.props({
			cityData: _getSiteDataById(cityId), 
			categories: _getCategoryById(categoryIds)
		}).then(function(result) {
			// Checking that all data exist
			try{
			var coords = [result.cityData.result.geometry.location.lat,
						result.cityData.result.geometry.location.lng]
			//var query = result.categories[0]._doc.foursquareQuery;
			var categories = {};
			result.categories.forEach((model)=>{
				categories[model._doc.name] =searchSitesByQuery(model._doc.foursquareQuery, coords)
			})
			// need to create object with the category name and their queries
			//categories

			return Promise.props(
				categories
			)
			//searchSitesByQuery(queries, coords);
		}
		catch(err){
			console.error("Error performing getting sites by city and category id: " +err)
			throw "Error performing getting sites by city and category id: " + err;
		}
		});

	return searchSitesByQuery(query, location)
}
let searchSitesByQuery=(query, location)=>{
	var promise = new Promise((resolve, reject)=>{
	filter={
		query:query, 
		ll:location[0]+","+location[1]
	}

	foursquare.venues.search(filter, (err, data)=>{
		resolve(data.response.venues.map(_mapForSquareSites));
		})
	})

	return promise;
}
let getAllSiteCategories = function(){
	return SiteCategory.find({});
}

let _getCategoryById = function(categoryIds){
	var pr = new Promise((resolve, reject)=>{
		SiteCategory.find()
	 	.where('_id')
	 	.in(dbAccess.tools.generateIdList(categoryIds))
	 	.exec((err, data)=>{
			 if(err)	
			 	reject('error from db')
			else
				resolve(data)
		 })
	})

	return pr;
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
	var promise = new Promise((resolve, reject)=>{
		//foursquare.venues.
	foursquare.venues.venue(siteId,{}, (err, data)=>{
		resolve(_mapFoursquaresite(data.response.venue));
	//var i  =  data;
		})
	})

	return promise;

}
let _mapFoursquaresite = (site)=>{
	var photos=[];
	if(site.photos.groups[0]){
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