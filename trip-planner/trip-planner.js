
// This is the class that generates the trips.
// It recieves the user perfences .
function TripPlanner (tripDates, accomodation, selectedSites){
    this.tripDates = tripDates;
    this.tripLength = tripDates.endDate - tripDates.startDate;

    this.accomodation = accomodation;
    this.selecedSites = selectedSites;

    this.plan = function(){
        
    }
}

module.exports = TripPlanner;