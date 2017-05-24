var userService = require('./user.service');
var baseController = require('../common/base.controller');
var tripService = require('../trip/trip.service')

var getUserById = function(req, res){
    var userId = req.params.id;
    if(userId ===undefined)
         baseController.handleBadRequestError("User Id wasn't found in the request")

    userService.getUserById(userId)
    .then(baseController.createDataHandler(res))
    .catch(baseController.createErrorHandler(res, "get user by id error"))
}

var addNewUser = function(req, res){
    if(!_validateNewUserParms(req.body))
        baseController.handleBadRequestError('New User Params Missing'); 

    userService.saveNewUser(req.body.userName, req.body.fbId)
    .then(baseController.createDataHandler(res))
    .catch(baseController.createErrorHandler(res, "add new user error"))
}

var getUserTrips = function(req, res){
    // Need to check that the user exist
    var userId = req.param('userId');
    if(typeof userId === undefined)
        baseController.handleBadRequestError('Get User trips Params Missing'); 

    tripService.getTripsByUser(userId)
    .then(baseController.createDataHandler(res))
    .catch(baseController.createErrorHandler(res, "Get user trips error"))
}
var _validateNewUserParms = function(obj){
    return (obj.userName!= undefined && obj.fbId!=undefined)
}



module.exports={
    getUserById:getUserById,
    addNewUser:addNewUser, 
    getUserTrips:getUserTrips

}