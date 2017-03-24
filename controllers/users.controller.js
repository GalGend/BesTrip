var userService = require('../services/users.service');

var getUserById = function(req, res){
    var userId = req.params.id;
    if(userId ===undefined)
         res.status(400).json({error:"User Id is not found in the request"});
    userService.getUserById(userId)
    .then(function(user){
        res.status(200).json(user);
    }).catch(function(err){
        // Checking whether the user does not exist or internal
        //TODO
       res.status(500).send({error:'Internal Error: could not get the user'}); 
    })
}

var addNewUser = function(req, res){
    if(!_validateNewUserParms(req.body))
        res.status(400).send({error:'New User Params Missing'}); 

    userService.saveNewUser(req.body.userName, req.body.fbId)
    .then(function(data){
        res.status(200).json("User Added succesfully");
    }).catch(function(err){
       res.status(500).send({error:'Internal Error: adding new user has failed'}); 
    })
}

var _validateNewUserParms = function(obj){

    // Checking that all params exist
    if(obj.userName!= undefined && obj.fbId!=undefined){
        // return {
        //     userName:body.params.userName,
        //     fbId:body.params.fbId
        // }
        return true;
    }
    return false;
}

module.exports={
    getUserById:getUserById,
    addNewUser:addNewUser

}