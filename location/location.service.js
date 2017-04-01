var _ = require('underscore');
var Request = require('request-promise');


var getCitiesAutoComplete = function(searcText){
	// Generating the request to the google api
	var uri = _generateCityAutocompleteRequest(searcText);
	console.log('autocomplete request');
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
		console.log("Error performing request to google "+err);
	})
}

module.exports={
	getCitiesAutoComplete:getCitiesAutoComplete
}

var _generateCityAutocompleteRequest = function(searcText){
	return _generateGoogleApiReq({
		'input':searcText,
		'types':'(cities)'
	});
}


var _generateGoogleApiReq = function(params){
	if(process.env.GGL_CITIES_API_ADDR== undefined || process.env.GGL_API_KEY== undefined){
		console.error("env vars werent found");
		throw "environment variables were'nt found"
	}
	var req = process.env.GGL_CITIES_API_ADDR;
	req+='?';
	params.key = process.env.GGL_API_KEY;

	Object.keys(params).forEach((key) => {
   		 req+='&'+key+'='+params[key];    
	});

	return req;
}
