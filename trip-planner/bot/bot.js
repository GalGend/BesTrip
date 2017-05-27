// This is BOT- Bestrip Optimized Trip Algorithims
Lodash = require('lodash');
_ = require('underscore');
BOTLinearPartitioning = require('./bot-models/botLinearPartitioning')

function BOT(botSites, botDistabceTable, numberOfDays){

    this._sites = botSites;
    this.numberOfDays = numberOfDays;
    this._distanceTable = botDistabceTable;
    this._botLinearPartitioning;

    this.optimize = function(){
        // Need to calculate best partioning
        // need to take only the length og the trips using lodash or underscore
        var sitesLengths = _.pluck(this._sites, 'siteLength');
        this._botLinearPartitioning = new BOTLinearPartitioning(sitesLengths, this.numberOfDays);
        var firstPar = this._botLinearPartitioning.partition();

        // Now we have the best partiotion- need to optimize the site assiging
        // need to randomly choose sites - then the value of that partition
        // Is the time spent traveling (using dijaxtra)
    }

}
module.exports = BOT;