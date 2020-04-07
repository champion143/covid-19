var mongoose=require('mongoose');
const Schema = mongoose.Schema; //Instance

const subcategorySchema = new Schema({
    "menuList":[String],
    "Amount":Number
});

const categorySchema = new Schema({
    "Category":{
        type:String
    },
    "cuisine":{
        type:String
    },
    "menu":{
        type:[subcategorySchema]
    },
    
});
module.exports= mongoose.model('food', categorySchema)
