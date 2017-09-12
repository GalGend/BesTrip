var _ = require('underscore');
var Promise = require('bluebird');
var Request = require('request-promise');
var dbAccess = require("../common/db-access");
var SiteCategory = dbAccess.models.siteCategory;

var GooglePlaces = require('google-places');
var places = new GooglePlaces(process.env.GGL_API_KEY)
var googleMapsClient = require('@google/maps').createClient({
  key: process.env.GGL_API_KEY
})
var foursquare = Promise.promisifyAll(require('node-foursquare-venues')(process.env.FRSQR_CLIENT_ID, process.env.FRSQR_CLIENT_SCRT))

var util = require('util');


let getCitySitesByCategory = function(cityId, categoryIds){

	return Promise.props({
			cityData: _getSiteDataById(cityId), 
			categories: _getCategoryById(categoryIds)
	}).then(function(result) {
			// Checking that all data exist
		try{
			var address = result.cityData.result.formatted_address;
			var sitesByCategories = {};
			result.categories.forEach((model)=>{
				sitesByCategories[model._doc.name] =searchSitesByQuery(model._doc.foursquareQuery, address)
			})
			
			return Promise.props(sitesByCategories)
			
		}
		catch(err){
			console.error("Error performing getting sites by city and category id: " +err)
			throw "Error performing getting sites by city and category id: " + err;
		}
	})
		.catch((err)=>{
			console.error("Error performing getting sites by city and category id: " +err)
		});
}

let searchSitesByQuery=(query, address)=>{
	var promise = new Promise((resolve, reject)=>{
	filter={
		query:query, 
		near:address
	}

	foursquare.venues.explore(filter, (err, data)=>{
		if(data.response)
			resolve(data.response.groups[0].items.map(_mapForSquareSites));
		else
			throw "Foursqaure Internal Error"
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
			 	reject('Error from db getting categories')
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

var getDirections = function(firstSite, secondSite){
	// Need to get the possible directions from google maps
//getDirections	GooglePlaces.
//GooglePlaces.
	var i = 1;
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
		name:site.venue.name,
		placeId:site.venue.id,
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
		if(data.response)
			resolve(_mapFoursquaresite(data.response.venue));
		else
			reject('Foursqaure Internal Error');
		})
	})
	return promise;
}
var getSitesDataByIds = (siteIds)=>{

	promises = [];
	// Iterating over ids -  and resolving their data
	for(var i in siteIds){
		promises[i] = getSiteDataById(siteIds[i])
	}
	
	return Promise.all(promises);
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
		photos:photos,
		location:[site.location.lat,site.location.lng],
	}
}

var getHotelAutocomplete = function(searcText, cityId){

	return _getSiteDataById(cityId).then((cityData)=>{
		var address = cityData.result.formatted_address;
		var promise = new Promise((resolve, reject)=>{
		filter={
			query:searcText, 
			near:address,
			categoryId:'4bf58dd8d48988d1fa931735'
		}

		foursquare.venues.search(filter, (err, data)=>{
			if(data.response)
				resolve(data.response.venues.map(_mapHotel));
			else
				throw "Foursqaure Internal Error"
			})
		})

		return promise;
	})
}

let _mapHotel = (hotelData)=>{
	return {
		placeId:hotelData.id,
		name:hotelData.name
	}
}
var getDistanceMatrix = function(origins, destinations, mode){

	return new Promise((resolve, reject)=>{
		var query = {
	 		origins:origins,
	 		destinations:destinations,
	 		//mode:mode
	 	}
		 googleMapsClient.distanceMatrix(query, (err, data)=>{
			 // Need to loop on all the distances
			 if(err){
			 	console.log('Error from google matrix api:' + err)
				 reject("Error Getting Distance Matrix From Google Maps API")
			}
			
			 var totalDistances= [];
			 _.each(data.json.rows, (currentDistances)=>{
				list = [];
				_.each(currentDistances.elements,(elem)=>{
					list.push(elem.duration.value)
				}) 
				totalDistances.push(list);
			 })
			 resolve(totalDistances);
		 })
	})
}

module.exports={
	getCitiesAutoComplete:getCitiesAutoComplete,
	getAllSiteCategories:getAllSiteCategories,
	getCitySitesByCategory:getCitySitesByCategory,
	getSiteById:getSiteDataById,
	getHotelAutocomplete:getHotelAutocomplete,
	getSitesDataByIds:getSitesDataByIds,
	getDirections:getDirections, 
	getCityDataById:_getSiteDataById,
	getDistanceMatrix:getDistanceMatrix
}