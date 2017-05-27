var dbAccess = require('../common/db-access')
var Trip = dbAccess.models.trip;
var Promise = require('bluebird');
var locationService = require('../location/location.service')
var TripPlanner = require('../trip-planner/trip-planner')

var getTripById=function(mongoId){
    return Trip.findById(mongoId, {name:1, 
		_id:0, dates:1, "tripPlan.days":1, "tripPlan.days.sites.siteLocation":1,
		"tripPlan.days.dayIndex":1, "tripPlan.days.date":1
	}).then((day)=>{
		// Returning the formatted trip
		return _formatTripDetails(day);
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

var planTrip=function(accomodation, siteIds, dates){

	var sites = locationService.getSitesDataByIds(siteIds);
	sites.then((sites)=>{
		// Now we have the sites
		// Also should provide the time to spend in the site
		var tripPlanner = new TripPlanner(dates, accomodation, _.map(sites, _formatSitesForPlanner));
		tripPlanner.plan();
	})
}

var getTripsByUser = function(userId){
	return Trip.find({user:userId}, {_id:1, name:1})
}
var _formatTripDetails=(trip) =>{

	var days =[]
	trip.tripPlan.days.forEach((day)=>{
		dayLocations = [];
		day.sites.forEach((site)=>{
			dayLocations.push(site.siteLocation)
		})
		var cday = {
			index:day.dayIndex,
			date:day.date,
			locations:dayLocations
		};

		days.push(cday)
	})

	return {
		name:trip.name,
		dates:trip.dates,
		days:days
	}
}

var _formatSitesForPlanner=function(site){
	
	return {
		siteId:site.placeId,
		location:site.location,
		siteName:site.name
	}
}
module.exports={
    getTripById:getTripById,
    getTripDayByIndex:getTripDayByIndex,
	saveNewTrip :saveNewTrip,
	updateTripPlan:updateTripPlan, 
	getTripsByUser:getTripsByUser,
	planTrip:planTrip
	
}

