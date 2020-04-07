var mongoose=require('mongoose');
const Schema = mongoose.Schema;
 
const venueSchema = new Schema({
    "name":{
        type:String
    },
    "mobile":{
        type:Number
    },
    "email":{
        type:String
    },
    "no_of_seats":{
        type:Number
    },
    "type":{
        type:Number
    },
    "location":{
        type:String
    },
    "qrcode":{
        type:String
    },
  });

module.exports= mongoose.model('tbl_venue', venueSchema)