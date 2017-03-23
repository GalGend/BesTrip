var mongo = require('mongoose');


// connecting to the server
mongo.connect("mongodb://admin:admin@ds137530.mlab.com:37530/bestrip");

var User= mongo.model('Usres', {name:String})

var getById=function(id){

}

var saveNewUser=function(){
    var us = new User({name:"Gal Gendler"})
    us.save(function(data){
        var i=data;
        // comment
        var i="slack test";
    }, function(err){
        var i=err;


    });
}();
module.exports={
    getById:getById
}