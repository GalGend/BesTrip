
var Promise = require('bluebird')
var BOT = require('./bot/bot');
var BOTSite = require('./bot/bot-models/botSite')
var BOTDistanceTable = require('./bot/bot-models/botDistanceTable');

// This is the class that generates the trips.
// It recieves the user perfences .
function TripPlanner (tripDates, accomodation, selectedSites){
    this.tripDates = tripDates;
    this.tripLength = 3/* tripDates.endDate - tripDates.startDate; */

    this.accomodation = accomodation;
    this.sites = selectedSites;

    this._distanceCalculatorFunc = (first, second)=>{
        // TODO: use actul distance calculator
        return new Promise(function(resolve, reject){
            var val = Math.floor(Math.random()*(10-1+1)+1);
            console.log('Distance between %d and %d is %d', first, second, val)
            resolve (val)
        })
    }

    // The BOT Should recieve /: 1. a list of BOTSites/ 2. a BOT DistanceTable
    this.plan = function(){
        // Crating a new BOT 

        botSites = []
        for (var i in sites){
        this.botSites.push(new BOTSite(sites[i], i))
    }
        botDistanceTable = new BOTDistanceTable(botSites.length);
        // Need to fill the values
        this.fillBotDistanceTable(botDistanceTable, botSites);
        botDistanceTable.printDistanceTable(botDistanceTable, botSites);
      //  botDistanceTable.fillTableArray(this._distanceCalculatorFunc)

        var optimizer = new BOT(botSites, botDistanceTable,this.tripLength);
    }


    this.fillBotDistanceTable = function(botDistanceTable, botSites){
        for (var i=0;i<botSites.length -1; i++ ){
            for (var j =botSites.length -1; j>i; j-- ){
            var val = Math.floor(Math.random()*(10-1+1)+1);
            console.log('Distance %d  : %d   %d', i,j,val)
              botDistanceTable.setDistance(i,j,val)
            }
        }
    }

    this.plan();
}

TripPlanner({
    startDate: new Date(2017, 02, 02),
    endDate: new Date(2017, 03, 03)
}, 
undefined,['3523', '12332', '22300', '4930440'] )

module.exports = TripPlanner;
