// This is where all db schemas will register


var registerSchemas = function (mongo){}

//     var tripSchema = new mongo.Schema({
//   // Missing properties: tripPlan.transport
//   owner:{type: mongo.Schema.Types.ObjectId, ref:'User'}, 
//   dates:{
//     from:mongo.Schema.Types.Date,
//     to:mongo.Schema.Types.Date,
//   }, 
//   destination:{
//     id:String,
//     name:String
//   }, 
//   tripPlan:{
//     accomodation:{

//     },
//     days:[{
//         dayIndex:Number,
//         date:Date, 
//         sites:[{
//           siteIndex:Number, 
//           placeId:String,
//           //siteLocation:,
          
//         }],
//         // transport:[{
//         //   fromSiteIndex:Number,
//         //   toSiteIndex:Number,
//         //   type:
//         // }]
//       }],
//     }
// }
// )

// var siteCategory = new mongo.Schema({
  
// })
// };
  

module.exports = {
    RegisterSchemas:RegisterSchemas
}