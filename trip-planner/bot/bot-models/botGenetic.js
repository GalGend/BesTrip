
GeneticExecuter = require('genetic');
Promise = require('bluebird');
Lodash = require('lodash');

function BOTGenetic(firstGeneration, sites){

    _firstGen = firstGeneration;
    this.sites = sites;

    this._getRandomSolution = function(callback){

        // taking the first gen and changing it a little bit
        var ranDays = Lodash.clone(_firstGen);
        
        // random day index to mutate
        var randomDayIndex = Math.round(Math.random(0, ranDays.length));
        var randomSiteIndex = Math.round(Math.random(0, ranDays[randomDayIndex].length));

        // Checking the site index 
        var siteId = ranDays[randomDayIndex][randomSiteIndex];

        // rejecting it from the array
        delete ranDays[randomDayIndex][randomSiteIndex];

        var toRandomDayIndex = Math.round(Math.random(0, ranDays.length));
        
        if (typeof siteId !== 'undefined')
        {
            ranDays[toRandomDayIndex].push(siteId);
        }

        var newSolution = {
            days:ranDays
        }

        // shuffles the sites, returns a list of days (returns the k means)
       
        callback(newSolution);
    }

    this._fitness = function(solution, callback){
        // Return the average of the of the day spent, or the highest max day minus the smallest
        // Should return a number (I dont know if should me maximized or minimized)

        var daysLength = [];
        // Running over each day

        for (day in solution.days){
            // daysLength[day] = this._calculateDayLength(day.sites)
            daysLength[day] = 10;
        }

        // or calculating the average... shold decide
        var fitnessValue = Lodash.max(daysLength) - Lodash.min(daysLength);
        callback (fitnessValue);
    }

    this._calculateDayLength = function(solution){
        var sum =0;
        for (site in solution.days){
            sum+=site.siteLength;
        }
    }
    this._mutate = function(solution, callback){        
         //selecting from the most used day the closest site to the shortest day selecting the much spent days and gives it to the lest

         // Selecting the most used day, and the least used day

         // Checking the closest site from max that is closest to the centerpoint of min
         //mutating only these two days
         for (day in solution.days)
         {
            var currentIndex =  solution.days[day].length;

            // While there remain elements to shuffle...
            while (0 !== currentIndex) {
                currentIndex -= 1;
                if (typeof solution.days[day][currentIndex] === 'undefined')
                {
                    solution.days[day].splice(currentIndex, 1)
                }
            }
         }

        for (day in solution.days)
        {
            var currentIndex =  solution.days[day].length, temporaryValue, randomIndex, randomIndex2;

            // Pick a random day to move the last site
            randomIndex = Math.floor(Math.random() * currentIndex);
            randomIndex2 = Math.floor(Math.random() * (currentIndex - randomIndex + 1)) + 1;
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = solution.days[day][currentIndex];
            if (typeof temporaryValue !== 'undefined')
            {
                solution.days[day].splice(currentIndex, 1)
                solution.days[randomIndex].splice(randomIndex2,0,temporaryValue)
            }
        }
        callback (solution);
    }

    this._crossover = function(solutionA, solutionB, callback){

        var crossSolution = Lodash.clone(solutionA);
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

    this._stopCriteria = function(){
        // Needs to set a criterria
        return false;
    }
    // Maybe this function will generate more complex partiotion such as mixing 
    // Some sites together based on their closety 
    this.optimize=function(firstGen, callbacl){

      
        _firstGen = firstGen;

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

              taskInstance.run(function (stats) { console.log('results', stats)})
    }
}

module.exports = BOTGenetic;