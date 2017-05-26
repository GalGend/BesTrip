var pso = require('pso') 

var HOURS_A_DAY = 9;
var NUM_OF_DAYS = 6;
var NUMBER_OF_SITES = 20;

var optimizer = new pso.Optimizer();

// This is the function that calculates the efficiency of the trip
// Should calculate if such trip is possible (opening hours), that
// the time spent traveling is minimum and the days are balanced

var objectiveFunction = function(x){
    // time spent transporting
    // isTrip possible 
    // time of the day spent
    return -(x[0] * x[0] + x[1] * x[1]);
}
// set the objective function 
optimizer.setObjectiveFunction(objectiveFunction);
 
// set an initial population of 20 particles spread across the search space *[-10, 10] x [-10, 10]* 
optimizer.init(20, [{ start: -10, end: 10 }, { start: -10, end: 10 }]);
 
// run the optimizer 40 iterations 
for (var i = 0; i < 40; i++) {
    optimizer.step();
}
 
// print the best found fitness value and position in the search space 
console.log(optimizer.getBestFitness(), optimizer.getBestPosition());