
GeneticExecuter = require('genetic');
Promise = require('bluebird');
Lodash = require('lodash');
EventEmitter = require('events').EventEmitter

function BOTGenetic(sites, tripFitnessFunc){

    _firstGen = {} /*= firstGeneration;*/
    _tripFitnessFunc ={};
    this.sites = sites;

    this._getRandomSolution = function(callback){

        // taking the first gen and changing it a little bit
        var ranDays = Lodash.cloneDeep(_firstGen);
       // console.log("doing getting random solution")
        for(var i=0; i<4; i++){
            // random day index to mutate
            var randomDayIndex = Math.floor(Math.random() * ranDays.length  );
            var randomSiteIndex = Math.floor(Math.random() * ranDays[randomDayIndex].length  );

            // Checking the site index 
            var siteId = ranDays[randomDayIndex][randomSiteIndex];

            // rejecting it from the array
            //delete ranDays[randomDayIndex][srandomSiteIndex];

            var toRandomDayIndex = Math.floor(Math.random()* ranDays.length);
            

            ranDays[toRandomDayIndex].push(siteId);
            var toChangeIndex = ranDays[randomDayIndex][ranDays[randomDayIndex].length-1];
            ranDays[randomDayIndex][randomSiteIndex] = toChangeIndex;
            delete ranDays[randomDayIndex][ranDays[randomDayIndex].length-1];
            }
        var newSolution = {
            days:ranDays
        }
       
        callback(Lodash.cloneDeep(newSolution));
    }

    this._fitness = function(solution, callback){
        // Return the average of the of the day spent, or the highest max day minus the smallest
        // Should return a number (I dont know if should me maximized or minimized)
        // var daysLength = [];
        // // Running over each day

        // for (day in solution.days){
        //     // daysLength[day] = this._calculateDayLength(day.sites)
        //     daysLength[day] = Lodash.compact(solution.days[day]).length;
        // }

        // // or calculating the average... shold decide
        // var minDayLength = Lodash.min(daysLength);
        // var fitnessValue = (100-(Lodash.max(daysLength) - minDayLength))* (minDayLength!=0);
        var fitnessValue = _tripFitnessFunc(_deepCompact(solution));
         console.log('fitness of '+fitnessValue )
        callback (fitnessValue);
    }

    this._calculateDayLength = function(solution){
        var sum =0;
        for (site in solution.days){
            sum+=site.siteLength;
        }
    }

    this._mutate = function(solution, callback){
        // set on first day
        var longestDayID = -1
        var longestDayLength = 0
        var shortestDayID = -1
        var shortestDayLength = 0
       
        //  run on all days
        for (day in solution.days)
        {
            if ((longestDayID === -1) && (shortestDayID === -1)){
                longestDayID = day
                shortestDayID = day
                longestDayLength = calculateDay(solution.days[day])
                shortestDayLength = longestDayLength
            }
            else{
                // get day length
                var dayLength = calculateDay(solution.days[day])
                if (dayLength > longestDayLength){
                    longestDayLength = dayLength
                    longestDayID = day
                }
                else if (dayLength < shortestDayLength){
                    shortestDayID = day
                    shortestDayLength = dayLength
                }
            }
        }

        //  get random site from longest day
        var randomSiteFromLongestDay = Math.floor(Math.random() * longestDayLength);
        //  save site id
        var randomSiteID = solution.days[longestDayID][randomSiteFromLongestDay]
        //  remove random site from longest day
        solution.days[longestDayID].splice(randomSiteFromLongestDay, 1);
        //  add site to shortest day
        solution.days[shortestDayID].splice(solution.days[shortestDayID].length, 0, randomSiteID)

        callback (solution);
    }

    calculateDay = function(day){
        //  retruns the number of sites in the day
        return day.length;
    }

    this._crossover = function(solutionA, solutionB, callback){

        var crossSolution = Lodash.cloneDeep(solutionA);
        for (day in crossSolution.days)
        {
            var currentIndex =  solutionB.days[day].length, temporaryValue, randomIndex;

            // While there remain elements to shuffle...
            while (0 !== currentIndex) {
                // Pick a remaining element...
                randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex -= 1;

                // And swap it with the current element.
                temporaryValue = crossSolution.days[day][currentIndex];
                crossSolution.days[day][currentIndex] = crossSolution.days[day][randomIndex];
                crossSolution.days[day][randomIndex] = temporaryValue;
            }
        }
        callback (crossSolution);
    }

    this._stopCriteria = function(data){
        // Needs to set a cri

       // return this._fitness(solution)>90;
       //return  Math.floor(Math.random() * 100) == 90;
       //return this.statistics.maxScore >98;
       return this.generation ==3;
    }
    // Maybe this function will generate more complex partiotion such as mixing 
    // Some sites together based on their closety 
    this.optimize=function(firstGen, tripFitFunc,btcallback){

      
        _firstGen = firstGen;
        _tripFitnessFunc = tripFitFunc;

        options = { getRandomSolution : this._getRandomSolution  // previously described to produce random solution
                , popSize : 500  // population size
                , stopCriteria : this._stopCriteria  // previously described to act as stopping criteria for entire process
                , fitness : this._fitness  // previously described to measure how good your solution is
                , minimize : false  // whether you want to minimize fitness function. default is `false`, so you can omit it
                , mutateProbability : 0.1  // mutation chance per single child generation
                , mutate : this._mutate  // previously described to implement mutation
                , crossoverProbability : 0.3 // crossover chance per single child generation
                , crossover : this._crossover // previously described to produce child solution by combining two parents
              }

              var Task = GeneticExecuter.Task
              , taskInstance = new Task(options)

              taskInstance.run(function (stats) { 
                  console.log('results', stats)
                btcallback(Lodash.compact(stats.max.days));

                  function genFun(cb, stats){

                  }

                  // Adds an event listenet
                  //EventEmitter.on('run finished', cb())
            })
    }
}

_deepCompact = function(solution){
    for (day in solution.days) {
        solution.days[day] = Lodash.compact(solution.days[day])
    }

    return solution;
}

module.exports = BOTGenetic;