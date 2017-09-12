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
            this._botGenetic = new BOTGenetic(undefined, this._sites);
            // Now we performing the k means
            this._botKMeans.clusterize().then((cluster)=>{

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
                this._botGenetic.optimize(daysSites, function(besTrip){
                    
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

}
module.exports = BOT;