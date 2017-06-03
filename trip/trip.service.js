var dbAccess = require('../common/db-access')
var Trip = dbAccess.models.trip;
var Promise = require('bluebird');
var locationService = require('../location/location.service')
var TripPlanner = require('../trip-planner/trip-planner')
var _ = require('underscore')
var lodash = require('lodash')
var googleMapsClient = require('@google/maps').createClient({
  key: process.env.GGL_API_KEY
})

var getTripById=function(mongoId){
    return Trip.findById(mongoId, {name:1, 
		_id:0, dates:1, "tripPlan.days":1, "tripPlan.days.sites.siteLocation":1,
		"tripPlan.days.dayIndex":1, "tripPlan.days.date":1, "accomodation":1
	}).then((day)=>{
		return _formatTripDetails(day);
	})
}

var getTripDayByIndex=function(tripId, dayIndex){
return Trip.find({_id:dbAccess.tools.getIdObject(tripId), 
	"tripPlan.days.dayIndex":parseInt(dayIndex)}, 
	{_id:0, 'tripPlan.days.$':1}).then(function(data){
		return data[0]._doc.tripPlan.days[0]
	})
}

var saveNewTrip = function(tripObj){
	var promise = new Promise(function(resolve, reject){
		locationService.getCityDataById(tripObj.cityId)
		.then(function(data){
			var trip  = new Trip({
				name:"My Trip To "+data.result.formatted_address, 
				user: tripObj.user,
				dates:tripObj.dates, 
				accomodation:{
					accomodationPlaceId:tripObj.accomodationPlaceId
				}, 
				tripPlan:{}
			})

			// Getting all the missing params:
			// Data for the accomodation
			locationService.getSiteById(tripObj.accomodationPlaceId)
			.then((hotelSite)=>{
				// Setting the accomodation on the new trip
				trip.accomodation.accomodationLocation = hotelSite.location,
				trip.accomodation.accomodationName  = hotelSite.name
				planTrip(trip._doc.accomodation, tripObj.sites, tripObj.dates)
				.then(function(tripPlan){
					trip.tripPlan.days=[];
					trip.tripPlan.days = tripPlan.days;
					trip.save().then((data)=>{
						resolve({tripId:data._doc._id})
					})
				})
			})
		})
	})

	return promise;
}

var planTrip=function(accomodation, siteIds, dates){
	var sites = locationService.getSitesDataByIds(siteIds);

	return sites.then((sites)=>{
		var onlyLocations = _.pluck(sites, 'location');
		var tripPlanner = new TripPlanner(dates, accomodation, _.map(sites, _formatSitesForPlanner));
		return tripPlanner.plan()
	})
}

var getTripsByUser = function(userId){
	return Trip.find({user:userId}, {_id:1, name:1, dates:1})
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
		days:days,
		accomodation:trip.accomodation
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
	getTripsByUser:getTripsByUser,
	planTrip:planTrip
}

