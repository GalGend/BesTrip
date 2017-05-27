
executer = require('node-kmeans');
Promise = require('bluebird');

function BOTKMeans(elements, numOfPars){

    this.elements = elements;
    this.k = numOfPars;
    this._cluster = executer;

    // Maybe this function will generate more complex partiotion such as mixing 
    // Some sites together based on their closety 
    this.clusterize=function(){

        var promise = new Promise((resolve, reject)=>{
            let vectors = new Array();
            for (let i = 0 ; i < this.elements.length ; i++) {
                vectors[i] = this.elements[i].siteLocation;
    }

            this._cluster.clusterize(vectors, {k: this.k}, (err,res) => {
                if (err) {
                    console.error(err);
                    reject();
                }
                else {
             //       console.log('%o',res)
                    resolve(res);
                };
            });
        })
        return promise;
    }
}

module.exports = BOTKMeans;