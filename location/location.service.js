var _ = require('underscore');
var Promise = require('bluebird');
var Request = require('request-promise');
var SiteCategory = require("../common/db-access").models.siteCategory;

var GooglePlaces = require('google-places');
var places = new GooglePlaces(process.env.GGL_API_KEY)


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
			var query = result.siteCategory[0]._doc.googleQuery;
			
			return searchSitesByQuery(query, coords);
		}
		catch(err){
			console.error("Error performing getting sites by city and category id")
			throw "Error performing getting sites by city and category id";
		}
		});

	return searchSitesByQuery(query, location)
}
let searchSitesByQuery=(query, location)=>{

	var promise = new Promise((resolve, reject)=>{;
		places.search({keyword: query, 
			radius:9000,
			location:location
		}, 
		function(err, response) {
			console.log("search: ", response.results);
			resolve(_.map(response.results, _mapSites));
		}
	, function(err, response) {
		console.log("search details: ", response.result.website);
	})
		})

	return promise;
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
		return data.predictions.map((city)=>{ return {
				id:city.id,
				placeId:city.place_id, 
				mainText:city.structured_formatting.main_text,
				secondaryText:city.structured_formatting.secondary_text
			}
		})
	})
	.catch(function(err){
		console.log("Error performing autocomplete request to google "+err);
		throw "Error performing autocomplete request to google "+err;
	})
}

module.exports={
	getCitiesAutoComplete:getCitiesAutoComplete,
	getAllSiteCategories:getAllSiteCategories,
	getCitySitesByCategory:getCitySitesByCategory
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

let _mapSites = (site)=>{
	return {
		name:site.name,
		placeId:site.place_id,
		rating:site.rating
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
	
