var mongoose=require('mongoose');
const Schema = mongoose.Schema;
 
const doctorSchema = new Schema({
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
    "is_available":{
        type:Number
    },
    "speciality":{
        type:String
    },
    "location":{
        type:String
    }

  });

module.exports= mongoose.model('tbl_doctor', doctorSchema)