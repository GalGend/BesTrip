var User = require('../common/db-access').models.users;

var getUserById=function(mongoId){
    return User.findById(mongoId)
    // TODO: need to tell what caused the error:
    
    // .then (function(data){
    //     // Checking the length of the data
    //     if(data){
    //         // Needs to reject the promise
    //         resolve(data);
    //     }
    // })
    // .catch(function(err){
    //     // Checking what caused the error- whether the user
    //     // was not found or db error
    //     var i = err;
    // });
}

var saveNewUser=function(userName, fbId){

    var us = new User({
        name:userName,
        fbId:fbId});

     return us.save()
    
};

var getUserTrips= function(userId){

}

var getUserByFBId = function(fbId){

}

module.exports={
    getUserById:getUserById,
    saveNewUser:saveNewUser
}