var _ = require('underscore');
var Request = require('request-promise');


var getCitiesAutoComplete = function(searcText){
	// Generating the request to the google api
	var uri = _generateCityAutocompleteRequest(searcText);
	return Request({
		uri:uri,
		json:true
	})
	.then(function(data){
		return  _.map(data.predictions, _mapCityAutoComplete);
	})
	.catch(function(err){
		console.log(err);
	})
}

module.exports={
	getCitiesAutoComplete:getCitiesAutoComplete
}

var _generateCityAutocompleteRequest = function(searcText){
	// Taking the api address,
	var params = {
		'input':searcText,
		'types':'(cities)'
	};
	
	var req = _generateGoogleApiReq(params);
	
	return req;

}


var _generateGoogleApiReq = function(params){

	// TODO: Check that the variable exist
	// otherwise, return internal server error
	var req = process.env.GGL_CITIES_API_ADDR;
	req+='?';
	req+='key='+process.env.GGL_API_KEY;

	for(var key in params){
		req+='&'+key+'='+params[key];
	}

	return req;
}

var _mapCityAutoComplete = function(city){
	return {
		id:city.id,
		placeId:city.place_id, 
		mainText:city.structured_formatting.main_text,
		secondaryText:city.structured_formatting.secondary_text
	}
}