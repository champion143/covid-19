var mongoose=require('mongoose');
const Schema = mongoose.Schema;
 
const temperatureSchema = new Schema({
    "user_id":{
        type:String
    },
    "temperature":{
        type:String
    },
    "date":{
        type:String
    },
    "status":{
        type:Number
    },
    "venue_id":{
        type:String
    },
    "type":{
        type:String
    }
  });

module.exports= mongoose.model('tbl_temperature', temperatureSchema)