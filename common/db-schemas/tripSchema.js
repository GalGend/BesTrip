module.exports= function(mongo){
    var tripSchema = new mongo.Schema({
        name:  String,
        dates:{from:Date,
                to:Date
        },
        user:String,
        accomodation:{
            accomodationName:String,
            accomodationLocation:[],
            accomodationLocationPlaceId:String
        },
        tripPlan:{
            days:[{
                dayIndex:Number,
                date:Date,
                sites:[{
                    siteIndex:Number,
                    siteName:String,
                    siteLocation:[],
                    placeId:String
                }],
                transport:[{
                    toSiteIndex:Number,
                    method:String,
                    description:String
                }]
          }]
        }
    })
    return tripSchema;
}
