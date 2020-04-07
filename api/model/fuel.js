var mongoose=require('mongoose');
const Schema = mongoose.Schema; //Instance

const userSchema = new Schema({
    "rate":{
        type:Number
    },
    "ml":{
        type:String
    },
    "day":{
        type:Number
    },
    "amount":{
        type:Number
    },
    "totalfuel":{
        type:Number
    }
})
module.exports= mongoose.model('fuel', userSchema)