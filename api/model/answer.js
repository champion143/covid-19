var mongoose=require('mongoose');
const Schema = mongoose.Schema;
 
const answerSchema = new Schema({
    "user_id":{
        type:Number
    },
    "answer":{
        type:String
    },
    "question_id":{
        type:String
    }
});

module.exports= mongoose.model('tbl_answer', answerSchema)