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
		//return  _.map(data.predictions, _mapCityAutoComplete);
		return data.predictions.map((city)=>{ return {
				id:city.id,
				placeId:city.place_id, 
				mainText:city.structured_formatting.main_text,
				secondaryText:city.structured_formatting.secondary_text
			}
		})
	})
	.catch(function(err){
		console.log(err);
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

	// TODO: Check that the variable exist
	// otherwise, return internal server error
	var req = process.env.GGL_CITIES_API_ADDR;
	req+='?';
	params.key = process.env.GGL_API_KEY;

	Object.keys(params).forEach((key) => {
   		 req+='&'+key+'='+params[key];    
	});

	return req;
}
