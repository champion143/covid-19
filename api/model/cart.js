var mongoose=require('mongoose');
const Schema = mongoose.Schema; 

const cartschema= new Schema({
    "Category":{
        type:String
    },
    "cuisine":{
        type:String
    },
    "item":{
        type:[String]
    },
    "cost":{
        type:Number},
    "favitem":{
        type:[String]},
    "favourite":{
        type:Boolean,
        default:false},
    "ratings":{
        type:[Number]},
    "avgr":{
        type:Number},
    "likes":{
        type:Number,
        default:0},
    "comment":{
        type:[String]}
});
module.exports=mongoose.model('cart',cartschema)