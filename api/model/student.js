var mongoose=require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    "batchid":{
        type:Number
    },
    "nos":{
        type:String
    },
    "completed":{
        type:Number
    },
    "access":{
        type:Number
    },
    "info":{
        type:String
    }
    },{timestamps:true}
    
)
module.exports= mongoose.model('student', userSchema)