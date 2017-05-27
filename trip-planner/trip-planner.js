
var Promise = require('bluebird')
var BOT = require('./bot/bot');
var BOTSite = require('./bot/bot-models/botSite')
var BOTDistanceTable = require('./bot/bot-models/botDistanceTable');
var BOTSiteLengthEnum = require('./bot/bot-models/botSiteLengthEnum');
var LocationService = require('../location/location.service')

// This is the class that generates the trips.
// It recieves the user perfences .
function TripPlanner (tripDates, accomodation, selectedSites){
    this.tripDates = tripDates;
    this.tripLength = 9/* tripDates.endDate - tripDates.startDate; */

    this.accomodation = accomodation;
    this.sites = selectedSites;

    // The BOT Should recieve /: 1. a list of BOTSites/ 2. a BOT DistanceTable
    this.plan = function(){
        var self = this;
        // Crating a new BOT 
        var botSites = []

        //botSites
        for (var i in this.sites){
            var cSite = this.sites[i];
        botSites.push(new BOTSite(cSite, i, this.getSiteLength(cSite), cSite.location))
    }
       
        var botDistanceTable = new BOTDistanceTable(botSites.length);

        // Need to fill the values
        this.fillBotDistanceTable(botDistanceTable, botSites);
        botDistanceTable.printDistanceTable(botDistanceTable, botSites);

        var optimizer = new BOT(botSites, botDistanceTable,this.tripLength);
        optimizer.optimize().then((cluster)=>{
            //cluster.cl
            for (var day =0 ; day<cluster.length; day++){
                var dayCluster = cluster[day];
                console.log('-------------Day %d : ', day);
                for (var siteIdx =0; siteIdx<dayCluster.clusterInd.length; siteIdx++){
                    console.log(self.sites[dayCluster.clusterInd[siteIdx]].siteName)
                }
            }
        })
    }


    this.fillBotDistanceTable = function(botDistanceTable, botSites){
        for (var i=0;i<botSites.length -1; i++ ){
            for (var j =botSites.length -1; j>i; j-- ){
            var val = Math.floor(Math.random()*(20-1+1)+1);
            console.log('Distance %d  : %d   %d', i,j,val)
              botDistanceTable.setDistance(i,j,val)
            }
        }
    }

    this.getSiteLength=function(siteId){
        // need to randomly choose length

        // TODO: get the corret site length (time to spend in site)
        var num = Math.floor(Math.random()*(4-1+1)+1);
        switch(num){
            case(1):{
                return BOTSiteLengthEnum.Short;
                break;
            }
            case(2):{
                return BOTSiteLengthEnum.Medium;
                break;
            }
            case(3):{
                return BOTSiteLengthEnum.Long;
                break;
            }
            case(4):{
                return BOTSiteLengthEnum.Longer;
                break;
            }

        }
    }
}

module.exports = TripPlanner;
