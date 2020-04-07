var mongoose=require('mongoose');
const Schema = mongoose.Schema;
 
const questionSchema = new Schema({
    "question":{
        type:String
    }
});

module.exports= mongoose.model('tbl_question', questionSchema)