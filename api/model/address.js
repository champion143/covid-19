var mongoose=require('mongoose');
const Schema = mongoose.Schema;
 
const addressSchema = new Schema({
    "address1":{
        type:String
    },
    "address2":{
        type:String
    },
    "user_id":{
        type:String
    }
});

module.exports= mongoose.model('tbl_address', addressSchema)