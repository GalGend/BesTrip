var Promise = require('bluebird')
var mongo = Promise.promisifyAll(require('mongoose'));

// connecting to the server
mongo.connect("mongodb://admin:admin@ds137530.mlab.com:37530/bestrip");

// Creating all models
//var UserModel = mongo.Schema('Usres');

var userSchema = new mongo.Schema({
  name:  String,
  fbId: String,
 // trips: [{ id: String}]
// ref:'Users'
}); 

var tripSchema = new mongo.Schema({
  name:  String,
//  city:{name:String, id:String},
 // city:{},
  perfences:[]
}); 

module.exports={
    models:{
        users: mongo.model('User', userSchema)
    }
}