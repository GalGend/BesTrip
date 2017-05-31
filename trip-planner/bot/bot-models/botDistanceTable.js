module.exports = function BOTDistanceTable(numberOfSites){

    var Promise = require('bluebird')
    //this._sites = sites;
    this._numberOfSites = numberOfSites;
    this._distanceTableArray = [];
    // Initializing the distance
    for(var i = 0; i<this._numberOfSites; i++)
        this._distanceTableArray[i] = [];
    
    this.printDistanceTable = function(){
         console.log(this._distanceTableArray);
    }
    this.getDistance = function(firstSiteIndex, secondSiteIndex){
        return this._distanceTableArray[Math.min(firstSiteIndex, secondSiteIndex)]
                               [Math.max(firstSiteIndex, secondSiteIndex)]
    }
    this.setDistance = function(firstSiteIndex, secondSiteIndex, val){
        this._distanceTableArray[Math.max(firstSiteIndex, secondSiteIndex)]
                               [Math.min(firstSiteIndex, secondSiteIndex)] = val;
    }
    
}
