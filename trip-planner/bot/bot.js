// This is BOT- Bestrip Optimized Trip Algorithims
Lodash = require('lodash');
_ = require('underscore');
BOTLinearPartitioning = require('./bot-models/botLinearPartitioning')
BOTGenetic =require('./bot-models/botGenetic')
BOTKMeans = require('./bot-models/botKmeans')
Promise = require('bluebird')

function BOT(botSites, botDistabceTable, numberOfDays){

    this._sites = botSites;
    this.numberOfDays = numberOfDays;
    this._distanceTable = botDistabceTable;
    this._botLinearPartitioning;
    this._botKMeans ;
    this._botGenetic;

    
     

    this.optimize = function(){
        var promise = new Promise((resolve, reject)=>{
            // Need to calculate best partioning
            // need to take only the length og the trips using lodash or underscore
            var sitesLengths = _.pluck(this._sites, 'siteLength');
        // this._botLinearPartitioning = new BOTLinearPartitioning(sitesLengths, this.numberOfDays);
        //   var firstPar = this._botLinearPartitioning.partition();
        //    console.log(firstPar);
            
            // Creating the first generation of trip plan options
            this._botKMeans = new BOTKMeans(this._sites, this.numberOfDays);
            this._botGenetic = new BOTGenetic(this._sites);
            // Now we performing the k means
            this._botKMeans.clusterize().then((cluster)=>{
            self = this;
                // The bot should return the array of the days
                var daysSites=[];
                for (var day =0 ; day<cluster.length; day++){
                    var sites=[]
                    var dayCluster = cluster[day];
                    for (var siteIdx =0; siteIdx<dayCluster.clusterInd.length; siteIdx++){
                       //console.log(self.sites[dayCluster.clusterInd[siteIdx]].siteName)
                       sites[siteIdx] = dayCluster.clusterInd[siteIdx];
                    }
                    daysSites[day] = sites;
                }

                // Optimizing using bot genetic, sending a callback function to handle
                // the result
                this._botGenetic.optimize(daysSites, self.calculateTripScore, function(besTrip){
                    
                    var i=1;
                    // Here needs to resolve the solution
                    resolve(besTrip);
                })
                // Priniting the 
       //         resolve(daysSites);
            })
            // Now we have the best partiotion- need to optimize the site assiging
            // need to randomly choose sites - then the value of that partition
            // Is the time spent traveling (using dijaxtra)
        })

        return promise;
    }



    this._calculateDayWeight=function(day){
        
        var hotelIdSiteId=9;
        var dayWeight = 0;

        for(siteIdx in day){
            dayWeight+=90;
            var distanceFromSite = 0;

            if(siteIdx ==0 || siteIdx ==day.length -1)
                // Needs to send the id for the hotel because the user comes 
                // from the hotel
                distanceFromSite = self._getDistanceBetweenTwoSites(hotelIdSiteId, day[siteIdx])
            else
                distanceFromSite = self._getDistanceBetweenTwoSites(day[siteIdx], day[siteIdx+1])

            dayWeight+=90+ distanceFromSite;  
        }

        return dayWeight;
    }

    this.calculateTripScore = function(tripSolution){
        var daysScores =[];
        for(day in tripSolution.days){
            daysScores.push(self._calculateDayWeight(tripSolution.days[day]))
        }

        // Needs to calculate the score of the trip
        return 1000-(Lodash.max(daysScores) - Lodash.min(daysScores));

    }

    this._getDistanceBetweenTwoSites=function(siteOne, siteTwo){
        return 20;
    }
}
    
module.exports = BOT;