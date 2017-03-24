var User = require('./dataAccess/dbAccess').models.users;

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
    .then(function(data){
        console.log('added the user')
    }, function(err){
        console.debug('could not add the user')
   });
};

var getUserTrips= function(userId){

}

var getUserByFBId = function(fbId){

}

module.exports={
    getUserById:getUserById,
    saveNewUser:saveNewUser
}