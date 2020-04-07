var mongoose=require('mongoose');
const Schema = mongoose.Schema;
 
const userSchema = new Schema({
    "first_name":{
        type:String
    },
    "last_name":{
        type:String
	},
	"gender":{
        type:String
    },
    "email":{
        type:String
    },
    "password":{
        type:String
    },
    "mobile":{
        type:Number
	},
	"counter":{
		type:Number,
		default:0
    },
    "otp":{
        type:Number,
        default:null,
        expires:1
    },
    "Account_number":{
        type:Number
    }
    //"created": { type: Date, required: true, default: Date.now, expires: 30 }
    //"created": { type: Date, default:null, expires: 2}
},
{
    timestamps: true
    });
    //const bankschema=new Schema({ createdAt: { type: Date, expires: 3600 }});
module.exports= mongoose.model('bank', userSchema)

// var mongoose=require('mongoose');
// const Schema = mongoose.Schema;

// const joi = require("@hapi/joi");

// const schema = {
// 	user: joi.object({
// 		first_name : joi.string().max(100).required(),
// 		last_name : joi.string().max(100).required(),
// 		gender : joi.string().valid("m","f","o").required(),
// 		email : joi.string().email().required(),
// 		password : joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),
// 		mobile : joi.number().integer().min(1000000000).message("Invalid mobile number").max(9999999999).message("Invalid mobile number").required()
// 	})
// };

// module.exports = schema;