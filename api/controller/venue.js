var venuemodel=require('../model/venue')
var bcrypt=require("bcrypt")
var token;
var jwt=require("jsonwebtoken")
var multer= require('multer')
var message = require('../helper/message')
const translatte = require('translatte');
const { response } = require('../../lang/index')
module.exports.register=(req,res)=>{
    let lng = req.headers.lng;
    let name = req.body.name;
    let mobile = req.body.mobile;
    let email = req.body.email;
    let no_of_seats = req.body.no_of_seats;
    let location = JSON.stringify(req.body.location);
    let type = req.body.type;
    let qrcode = Date.now() + Math.random();
    new venuemodel({
        "name":name,
        "mobile":mobile,
        "email":email,
        "no_of_seats":no_of_seats,
        "location":location,
        "type":type
    }).save().then((data)=>{
        let message = '';
        translatte(response.message.success.venueregistersuccess, {to: lng}).then(res1 => {
            message = res1.text;
            res.json({  
                "status":response.message.success.statusCode,
                "success":true,
                "message": message,
                "Data":data
            })
        }).catch(err => {
            console.error(err);
        }); 
        
    })
}