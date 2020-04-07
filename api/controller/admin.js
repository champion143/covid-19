var addressmodel=require('../model/address')
var temperaturemodel=require('../model/question')
var alertmodel=require('../model/alert')
var userqrmodel=require('../model/userqr')
var doctormodel = require('../model/doctor');
var bcrypt=require("bcrypt")
var token;
var jwt=require("jsonwebtoken")
var multer= require('multer')
var message = require('../helper/message')

module.exports.addquestion=(req,res)=>{
    let question =  req.body.question;

    new temperaturemodel({
        "question":question
    }).save().then((response)=>{
        res.json({
            "success":true,
            "message":"Question Addedd Successful",
        })
    })

}

module.exports.adddoctor=(req,res)=>{
    let firstname = req.body.firstname;
    let lastname = req.body.lastname;
    let mobile = req.body.mobile;
    let email = req.body.email;
    let is_available = req.body.is_available;
    let speciality = req.body.speciality;
    let location = JSON.stringify(req.body.location);
    new doctormodel({
        "firstname":firstname,
        "lastname":lastname,
        "mobile":mobile,
        "email":email,
        "is_available":is_available,
        "speciality":speciality,
        "location":location
    }).save().then((response)=>{
        res.json({
            "success":true,
            "message":"Doctor Added Successfully",
        })
    })
}