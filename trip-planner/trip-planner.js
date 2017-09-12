
var Promise = require('bluebird')
var BOT = require('./bot/bot');
var BOTSite = require('./bot/bot-models/botSite')
var BOTDistanceTable = require('./bot/bot-models/botDistanceTable');
var BOTSiteLengthEnum = require('./bot/bot-models/botSiteLengthEnum');
var LocationService = require('../location/location.service')
var lodash = require('lodash')
var _ = require('underscore')

var TripDay = require('./models/tripDay');
var TripPlan = require('./models/tripPlan');
var TripSite = require('./models/tripSite');
var TripTransport = require('./models/tripTransport');

// This is the class that generates the trips.
// It recieves the user perfences .
function TripPlanner (tripDates, accomodation, selectedSites){
    this.tripDates = tripDates;
    this.tripLength = Math.round((tripDates.to - tripDates.from) /60 /60 / 24 /1000) + 1

    this.accomodation = accomodation;
    this.sites = selectedSites;

    // The BOT Should recieve /: 1. a list of BOTSites/ 2. a BOT DistanceTable
    this.plan = function(distanceFunction){
        var promise = new Promise((resolve, reject)=>{
            var self = this;
            // Crating a new BOT 
            var botSites = []

            //botSites
            for (var i in this.sites){
                var cSite = this.sites[i];
                botSites.push(new BOTSite(cSite, i, BOTSiteLengthEnum.Long, cSite.location))
             }
        
            var botDistanceTable = new BOTDistanceTable(botSites.length);

            // Need to fill the values
            this.fillBotDistanceTable(botDistanceTable, botSites, distanceFunction)
            .then(()=>{
                botDistanceTable.printDistanceTable(botDistanceTable, botSites);

                var optimizer = new BOT(botSites, botDistanceTable,this.tripLength);
                optimizer.optimize().then((daysPlan)=>{
                    var tripDays = [];
                    for (var day =0 ; day<daysPlan.length; day++){
                        var tripSites = [];
                        var daySites = daysPlan[day];
                    //   console.log('---------Day %d --------: ', day);
                        for (var siteIdx =0; siteIdx<daySites.length; siteIdx++){
                            // creating new trip site
                            var site= self.sites[daySites[siteIdx]];
                            var tripSite = new TripSite(siteIdx+1, site.siteName, site.siteId, site.location )
                            tripSites[siteIdx] = tripSite;
                        //  console.log('- Site %d',siteIdx,  self.sites[daySites[siteIdx]].siteName)
                    }
                        // calculating the right date
                        var date = new Date( self.tripDates.from.getTime()+ (day*60*60*24*1000))
                        var tripDay = new TripDay(day+1, date, tripSites, []/* TODO: should be the transport */)
                        tripDays[day] = tripDay;
                    }

                    // Now we have the tripDays full
                    resolve(new TripPlan(tripDays));
                })
            })
        })

        return promise;
    }

    this.fillBotDistanceTable = function(botDistanceTable, botSites, distanceFunc){
         var promises = []
        for (var i=0;i<botSites.length -1; i++ ){
            // Calculating the distance between current site to others
            var index = i;
            promises.push(distanceFunc([botSites[i].siteLocation], _.pluck(lodash.takeRight(botSites, botSites.length -1-i), 'siteLocation'))
            .then((iDistances)=>{
                // Running over the distances
                _.each(iDistances, (jDistance, jIndex)=>{
                    botDistanceTable.setDistance(i,jIndex,jDistance[jIndex])
                })
            }))
          //  return Promise.all(promises)
        }
         return Promise.all(promises)
    }

    // this.getSiteLength=function(siteId){
    //     // need to randomly choose length

    //     // TODO: get the corret site length (time to spend in site)
    //     var num = Math.floor(Math.random()*(4-1+1)+1);
    //     switch(num){
    //         case(1):{
    //             return BOTSiteLengthEnum.Short;
    //             break;
    //         }
    //         case(2):{
    //             return BOTSiteLengthEnum.Medium;
    //             break;
    //         }
    //         case(3):{
    //             return BOTSiteLengthEnum.Long;
    //             break;
    //         }
    //         case(4):{
    //             return BOTSiteLengthEnum.Longer;
    //             break;
    //         }

    //     }
   // }
}

module.exports = TripPlanner;
