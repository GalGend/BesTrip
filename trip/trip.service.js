var dbAccess = require('../common/db-access')
var Trip = dbAccess.models.trip;
var Promise = require('bluebird');
var locationService = require('../location/location.service')

var getTripById=function(mongoId){
    return Trip.findById(mongoId, {name:1, 
		_id:0, dates:1, "tripPlan.days":1, "tripPlan.days.sites.siteLocation":1,
		"tripPlan.days.dayIndex":1, "tripPlan.days.date":1
	})
}

var getTripDayByIndex=function(tripId, dayIndex){
return Trip.find({_id:dbAccess.tools.getIdObject(tripId), 
	"tripPlan.days.dayIndex":parseInt(dayIndex)}, 
	{_id:0, 'tripPlan.days.$':1}).then(function(data){
		// Resolving only that day
		return data[0]._doc.tripPlan.days[0]
	})

}

var saveNewTrip = function(tripObj){
	var trip  = new Trip({name:tripObj.name,
		user: tripObj.user,
		dates:tripObj.dates, 
		accomodation:{
			accomodationPlaceId:accomodationPlaceId
		}, 
		tripPlan:{}
	})

	// Getting all the missing params:
	// Data for the accomodation
	return locationService.getSiteById(tripObj.accomodationPlaceId)
	.then((hotelSite)=>{
		// Setting the accomodation on the new trip
		trip.accomodation.accomodationLocation = hotelSite.location,
		trip.accomodation.accomodationName  = hotelSite.name

		return trip.save();
	})

}

var updateTripPlan = function(tripId, tripPlan){
	return Trip.findOneAndUpdate()
}
module.exports={
    getTripById:getTripById,
    getTripDayByIndex:getTripDayByIndex,
	saveNewTrip :saveNewTrip,
	updateTripPlan:updateTripPlan
	
}