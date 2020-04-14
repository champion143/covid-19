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
const translatte = require('translatte');
const { response } = require('../../lang/index')

module.exports.addquestion=(req,res)=>{
    let question =  req.body.question;
    let lng = req.headers.lng;

    new temperaturemodel({
        "question":question
    }).save().then((data)=>{
        let message = '';
        translatte(response.message.success.questionaddedsuccess, {to: lng}).then(res1 => {
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

module.exports.adddoctor=(req,res)=>{
    let firstname = req.body.firstname;
    let lastname = req.body.lastname;
    let mobile = req.body.mobile;
    let email = req.body.email;
    let is_available = req.body.is_available;
    let speciality = req.body.speciality;
    let location = JSON.stringify(req.body.location);
    let lng = req.headers.lng;
    new doctormodel({
        "firstname":firstname,
        "lastname":lastname,
        "mobile":mobile,
        "email":email,
        "is_available":is_available,
        "speciality":speciality,
        "location":location
    }).save().then((data)=>{
        
        let message = '';
        translatte(response.message.success.doctoraddedsuccess, {to: lng}).then(res1 => {
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