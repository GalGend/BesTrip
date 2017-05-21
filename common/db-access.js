var Promise = require('bluebird')
var mongo = Promise.promisifyAll(require('mongoose'));
var tripSchema = require("./db-schemas/tripSchema")(mongo)

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



var siteCategory = new mongo.Schema({
  name:String,
  googleQuery:String, 
  foursquareQuery:String
})

var generateIdList = (list)=>{
  var ids = []
  list.forEach((id)=>{ids.push( mongo.Types.ObjectId(id))})
  return ids;
}

var getIdObject = (id)=>{
  return mongo.Types.ObjectId(id);
}

module.exports={
    models:{
        users: mongo.model('User', userSchema),
        siteCategory:mongo.model('SiteCategory', siteCategory),
        trip:mongo.model('Trip',tripSchema)
    },
    tools:{
      generateIdList:generateIdList,
      getIdObject:getIdObject
    }
}