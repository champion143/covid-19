var mongoose=require('mongoose');
const Schema = mongoose.Schema;
 
const userqrSchema = new Schema({
    "user_id":{
        type:String
    },
    "peroid":{
        type:String
    },
    "is_expire":{
        type:Number
    },
    "qr":{
        type:String
    },
    "venue_id":{
        type:String
    }
});

module.exports= mongoose.model('tbl_userqr', userqrSchema)