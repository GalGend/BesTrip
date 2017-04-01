// This is where all db schemas will register


   var tripSchema = new mongo.Schema({
  // Missing properties: tripPlan.transport
  owner:{type: mongo.Schema.Types.ObjectId, ref:'User'}, 
  dates:{
    startData:mongo.Schema.Types.Date,
    startData:mongo.Schema.Types.Date,
    totalDays:Number
  }, 
  destination:{
    id:String,
    name:String
  }, 
  tripPlan:{
    accomodation:{

    },
    days:[{
        dayIndex:Number,
        date:Date, 
        sites:[{
          siteIndex:Number, 
          siteId:String
        }],
        // transport:[{
        //   fromSiteIndex:Number,
        //   toSiteIndex:Number,
        //   type:
        // }]
      }],
    }
   }, 
function RegisterSchemas(mongo){

    var tripSchema = new mongo.Schema({
  // Missing properties: tripPlan.transport
  owner:{type: mongo.Schema.Types.ObjectId, ref:'User'}, 
  dates:{
    startData:mongo.Schema.Types.Date,
    startData:mongo.Schema.Types.Date,
    totalDays:Number
  }, 
  destination:{
    id:String,
    name:String
  }, 
  tripPlan:{
    accomodation:{

    },
    days:[{
        dayIndex:Number,
        date:Date, 
        sites:[{
          siteIndex:Number, 
          siteId:String
        }],
        // transport:[{
        //   fromSiteIndex:Number,
        //   toSiteIndex:Number,
        //   type:
        // }]
      }],
    }
}
)
};

module.exports = {
    RegisterSchemas:RegisterSchemas
}