var mongoose=require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    "Year":{
        type:String
    },
    "Broad_Gauge":{
        type:String
    },
    "Metre_Gauge":{
        type:String
    },
    "Narrow_Gauge":{
        type:String
    },
    "Total":{
        type:String
    },
    
})
module.exports= mongoose.model('csvdb', userSchema)