
var TripService = require('./trip/trip.service');
var TripController = require('./trip/trip.controller');
var LocationService = require('./location/location.service');

var sites = ['4ac518ebf964a52048ac20e3','4bad16def964a520792c3be3', '4ac518d4f964a520aca720e3', '4bb8b9d3314e9521e2ad489d', '4ac518d1f964a520c3a620e3','4ac518b5f964a520c5a020e3','4ac518cef964a520fca520e3','4ac518d3f964a52054a720e3','4c48305e96abd13aa25e7301','553a30e1498e5acdfa9f19e3','4bc9d8eb937ca593e96aa692','4ac518edf964a520b5ac20e3', '4ac518cef964a520f6a520e3','4ac518f4f964a520daae20e3','4ae5b238f964a52087a121e3', '4af47862f964a520d6f221e3','505b0a96e4b0597d277e6444','4ba6419bf964a520b23f39e3','4ba6419bf964a520b23f39e3' , '4ac518cef964a52021a620e3', '4ac518d2f964a52026a720e3','4c7e58d85af8b60c74209210','4ac518cef964a520fba520e3', '4ac518ecf964a52078ac20e3', '51d6640f498e048f66b3f9ae', '4b7ed0c3f964a520820130e3','4bb8fad5cf2fc9b6a819a002','4ac518eef964a520ffac20e3','4ac518cef964a520f9a520e3','4c9c6a059c48236a1cb14dee','500d242fe4b0381c85380422','4eabe2530aafb00bd9251b78' ,'4bad083df964a52078263be3']
//var sites = ['4ac518ebf964a52048ac20e3','4bad16def964a520792c3be3', '4ac518d4f964a520aca720e3', '4bb8b9d3314e9521e2ad489d', '4ac518d1f964a520c3a620e3','4ac518b5f964a520c5a020e3','4ac518cef964a520fca520e3','4ac518d3f964a52054a720e3','4c48305e96abd13aa25e7301','553a30e1498e5acdfa9f19e3','4bc9d8eb937ca593e96aa692','4ac518edf964a520b5ac20e3', '4ac518cef964a520f6a520e3','4ac518f4f964a520daae20e3']
//var sites = ['4ac518ebf964a52048ac20e3','4bad16def964a520792c3be3', '4ac518d4f964a520aca720e3', '4bb8b9d3314e9521e2ad489d', '4ac518d1f964a520c3a620e3','4ac518b5f964a520c5a020e3','4ac518cef964a520fca520e3','4ac518d3f964a52054a720e3','4c48305e96abd13aa25e7301','553a30e1498e5acdfa9f19e3']
//var sites = ['4ac518cef964a5201da620e3', '4ac518d4f964a520aca720e3']
var accomodation={};
var tripDays = {
    from: new Date(2017, 02, 02),
    to: new Date(2017, 02, 03)
}
var travelMethods = ['car', 'walk'];

// var req={body:{
//     fromDate : tripDays.from,
// 	toDate :tripDays.to,
// 	destination : 'London',
// 	sites :sites,
// 	transport : travelMethods,
//     userId:'333', 
// 	accomodationPlaceId : '4c20d8c215b39c74bec635f2',
	
// }}
var req={body:{
    fromDate : "2017-05-12T22:00:00.000Z",
	toDate :"2017-05-14T22:00:00.000Z", 
	cityId : 'ChIJdd4hrwug2EcRmSrV3Vo6llI',
    sites :"4ac518ebf964a52048ac20e3;4bad16def964a520792c3be3;4ac518d4f964a520aca720e3;4bb8b9d3314e9521e2ad489d;4ac518d1f964a520c3a620e3;4ac518b5f964a520c5a020e3;4ac518d3f964a52054a720e3;4c48305e96abd13aa25e7301;553a30e1498e5acdfa9f19e3;4bc9d8eb937ca593e96aa692;4ac518edf964a520b5ac20e3;4ac518cef964a520f6a520e3",
    //sites :"4ac518ebf964a52048ac20e3;4bad16def964a520792c3be3;4ac518d4f964a520aca720e3;4bb8b9d3314e9521e2ad489d;4ac518d1f964a520c3a620e3;4ac518d3f964a52054a720e3;4c48305e96abd13aa25e7301;553a30e1498e5acdfa9f19e3",
    //sites :"4ac518ebf964a52048ac20e3;4bad16def964a520792c3be3;4ac518d4f964a520aca720e3;4bb8b9d3314e9521e2ad489d",
	transport : 'car;walk',
    userId:'59a14c6ad01cc9eca404e01f', 
	accomodationPlaceId : '4ba51d68f964a52030df38e3',
	
}}

var res = {
    status:()=>{return {
        json:()=>{}
    }}
}
TripController.createNewTrip(req, res);
LocationService.getDirections();
//TripService.planTrip(accomodation, sites, tripDays, travelMethods)

//LocationService.getDistanceMatrix(_)
