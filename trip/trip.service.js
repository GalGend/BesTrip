var Trip = require('../common/db-access').models.trip;
var Promise = require('bluebird');

var getTripById=function(mongoId){
   // return Trip.findById(mongoId)
   var trip = {
	name:"Trip To London",
	dates:{
		from: new Date("2016/12/05"),
		to:new Date("2016/12/07"),
	},
	days:[{
			index:1,
			date:new Date("2016/12/05"),
			locations:[[
				51.50778087767913,
				-0.16239166259765625
			],[
				51.50141662864482,
				-0.14085023600947902
			],[
			51.51329696070227,
			-0.15859290988571317
		]
            ]
			
		},{
			index:2,
			date:new Date("2016/12/06"), 
		},{
			index:3,
			date:new Date("2016/12/07")
		},
	]

}
   var promise = new Promise((resolve, reject)=>{
        resolve(trip)
   })
    return promise;

   
}

var getTripDayByIndex=function(tripId, dayIndex){
var tripDay={
	index:1,
	date:"05-12-16",
	sites:[{
		index:1,
		name:"Buckingham Palace",
		placeId:"4abe4502f964a520558c20e3",
		location: [
			51.50141662864482,
		-0.14085023600947902
]
	},{
		index:2,
		name:"Hyde Park",
		placeId:"4ac518d2f964a52026a720e3",
		location: [
			51.50778087767913,
			-0.16239166259765625
		]
	},{
		index:3,
		name:"Marble Arch",
		placeId:"4bd195aa9854d13a9abff94d",
		location: [
			51.51329696070227,
			-0.15859290988571317
		]
	}
	],
	transport:[
		{
			
			method:"bus",
			description:"Take 68 from Royal National Hotel to Buckingham Palace Road"
		},
		{
			method:"taxi",
			description:"Ask the driver to go to Hyde Park Corner"
		},
		{
			method:"walk",
			description:"Walk 2 minutes from Hyde Park corner to Marble Arch Corner"
		}
	]
}


    

    var promise = new Promise((resolve, reject)=>{
            resolve(tripDay)
    })
        return promise;
}


module.exports={
    getTripById:getTripById,
    getTripDayByIndex:getTripDayByIndex
}