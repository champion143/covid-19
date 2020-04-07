var venuemodel=require('../model/venue')
var bcrypt=require("bcrypt")
var token;
var jwt=require("jsonwebtoken")
var multer= require('multer')
var message = require('../helper/message')

module.exports.register=(req,res)=>{
    let name = req.body.name;
    let mobile = req.body.mobile;
    let email = req.body.email;
    let no_of_seats = req.body.no_of_seats;
    let location = JSON.stringify(req.body.location);
    let type = req.body.type;
    let qrcode = Date.now() + Math.random()
    new venuemodel({
        "name":name,
        "mobile":mobile,
        "email":email,
        "no_of_seats":no_of_seats,
        "location":location,
        "type":type
    }).save().then((response)=>{
        res.json({
            "success":true,
            "message":"Venue Registered Successfully",
            "Data":response
        })
    })
}