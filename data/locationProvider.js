var _ = require('underscore');

var locations = [{
		locationName:'Kiryat Ono',
		locationID:'1'
	}, {
		locationName:'Ganei Tikva',
		locationID:'2'
	}, {
		locationName:'Ashdod',
		locationID:'3'
	}, {
		locationName:'Netanya',
		locationID:'4'
	}, {
		locationName:'New York',
		locationID:'5'
	}, {
		locationName:'London',
		locationID:'6'
	}, {
		locationName:'Tel Aviv',
		locationID:'7'
	}]; 


module.exports.getLocations = function(searcText){

	var filterFunc = function(loc){
		console.log(loc.locationName);
		return loc.locationName.indexOf(searcText) !== -1;
	}

	var filteredLocs = _.filter(locations, filterFunc);
	return filteredLocs;
	
}