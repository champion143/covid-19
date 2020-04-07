var mongoose=require('mongoose');
const Schema = mongoose.Schema;
 
const userSchema = new Schema({
    "firstname":{
        type:String
    },
    "lastname":{
        type:String
    },
    "mobile":{
        type:Number
    },
    "email":{
        type:String
    },
    "is_verify":{
        type:Number
    },
    "img":{
        type:String
    },
    "photoId_no":{
        type:String
    },
    "venue_id":{
        type:String
    },
    "type":{
        type:Number
    },
    "countrycode":{
        type:String
    }

  });

module.exports= mongoose.model('tbl_user', userSchema)