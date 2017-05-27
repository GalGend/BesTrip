
executer = require('linear-partitioning');

function BOTLinearPartitioning (numbers, numOfPars){

    this.elements = numbers;
    this.k = numOfPars;
    this._partition = executer;

    // Maybe this function will generate more complex partiotion such as mixing 
    // Some sites together based on their closety 
    this.partition=function(){
        return this._partition(this.elements, this.k)
    }
}

module.exports = BOTLinearPartitioning;