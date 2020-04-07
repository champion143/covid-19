var mongoose=require('mongoose');
const Schema = mongoose.Schema;
 
const alertSchema = new Schema({
    "status":{
        type:Number
    },
    "date":{
        type:String
    },
    "location":{
        type:String
    },
    "user_id":{
        type:String
    }
});

module.exports= mongoose.model('tbl_alert', alertSchema)