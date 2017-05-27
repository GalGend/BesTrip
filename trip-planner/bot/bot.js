// This is BOT- Bestrip Optimized Trip Algorithims
Lodash = require('lodash');
_ = require('underscore');
BOTLinearPartitioning = require('./bot-models/botLinearPartitioning')
BOTKMeans = require('./bot-models/botKmeans')
Promise = require('bluebird')

function BOT(botSites, botDistabceTable, numberOfDays){

    this._sites = botSites;
    this.numberOfDays = numberOfDays;
    this._distanceTable = botDistabceTable;
    this._botLinearPartitioning;
    this._botKMeans ;

    this.optimize = function(){
        var promise = new Promise((resolve, reject)=>{
            // Need to calculate best partioning
            // need to take only the length og the trips using lodash or underscore
            var sitesLengths = _.pluck(this._sites, 'siteLength');
        // this._botLinearPartitioning = new BOTLinearPartitioning(sitesLengths, this.numberOfDays);
        //   var firstPar = this._botLinearPartitioning.partition();
        //    console.log(firstPar);

            this._botKMeans = new BOTKMeans(this._sites, this.numberOfDays);


            // Now we performing the k means
            this._botKMeans.clusterize().then((cluster)=>{
                // Priniting the 
                resolve(cluster);
            })
            // Now we have the best partiotion- need to optimize the site assiging
            // need to randomly choose sites - then the value of that partition
            // Is the time spent traveling (using dijaxtra)
        })

        return promise;
    }

}
module.exports = BOT;