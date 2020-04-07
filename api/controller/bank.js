var bankmodal= require('../model/bank')
var nodemailer=require('nodemailer')
var validator=require('email-validator')
var otpGenerator = require('otp-generator')
var date=new Date()
console.log(date)
//--------Bank Details----------
module.exports.getdet=(req,res)=>{
    var anumber= otpGenerator.generate(10, {
        upperCase: false,
        specialChars: false,
        digits: true,
        alphabets: false
        })
    var first_name=req.body.first_name;
    var last_name=req.body.last_name;
    var gender=req.body.gender;
    var email=req.body.email;
    var password=req.body.password;
    var mobile=req.body.mobile;
    var balance=req.body.balance;
    new bankmodal({
        "first_name":first_name,
        "last_name":last_name,
        "Account_number":anumber,
        "gender":gender,
        "email":email,
        "password":password,
        "mobile":mobile,
        "balance":balance
    }).save().then((data)=>{
        mail(data);
        console.log(data)
        bankmodal.updateOne({"_id":data._id},{'$inc':{counter:1}}).then((det)=>{
        console.log(data.counter)
        })
        res.json({
            "Success":"Successfully created Account, Check Mails",
            "Data":data
        })
    })
    
}
    //-----nodemiler integration-------
var mail=function(data){
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'cpdemo62@gmail.com',
            pass: 'root@123#' }
    });
    if(data.counter==0){
        console.log("counter"+data.counter)
        var mailOptions = {
            from: 'cpdemo62@gmail.com',
            to: data.email,
            subject: 'Sending Email using Node.js',
            text: `Hi, This is message is sent from Cp demo.
            This is test email for nodemailer.`,
            html: `<h1>Hi our new Member </h1><p>Name:${data.first_name}&nbsp${data.last_name}</p>
                                            <p>Gender:${data.gender}</p>
                                            <p>Email:${data.email}</p>
                                            <p>password:${data.password}</p>
                                            <p>mobile:${data.mobile}</p>
                                            <p><b>Congratulations</b></p>`        
            };
    }
    else if(data.counter==1){
        console.log("counter"+data.counter)
        var getotp = otpGenerator.generate(6, {
            upperCase: false,
            specialChars: false,
            digits: true,
            alphabets: false
            });
            bankmodal.updateOne({"_id":data._id},{'otp':getotp}).then((det)=>{
                console.log(data.otp)
                console.log(data.email)
                console.log(data.otp.createdAt)
            })
            
        var mailOptions = {
            from: 'cpdemo62@gmail.com',
            to:data.email,
            subject: 'Sending Email using Node.js',
            html: `<h1>Hi our new Member </h1>
                        <p>Your One time confirmation Code is: <b>${getotp}</b></p>
                        <p>Thanks for yor Support</p>`
        }
    
    }
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);}
            else {
            console.log('Email sent: ' + info.response+' at '+log-timestamp);}
        })
}

//----------Email verification----------
module.exports.login=(req,res)=>{
    var email=req.body.email;
    var password=req.body.password;
    bankmodal.findOne({"email":email}).then((found)=>{
        if(found==null){
            res.json({
                "success":false,
                "message":"No such user exists"}) 
        }else{
           bankmodal.findOne({"password":password}).then((data)=>{

                if(data)
                {

                        console.log(data)
                        mail(data);
                        bankmodal.updateOne({"_id":data._id},{'$inc':{counter:1}}).then((det)=>{
                            })
                        res.json({
                                 "success":true,
                                 "message":"Congrats!! Login Successful. Kindly verify your Email"
                                
                        })
                    
                }else{
               //console.log(result)
               res.json({
                "success":false,
                "message":"Email and password not matching"
                        })
                    }
                })
            }
        })
    }
//=-=-=-=-=--=-=-=-=-=-=-=-=-=-=OTP Verfication=-=-=-=-=-=-=-=-=-=-=-
module.exports.checkotp=(req,res)=>{
    var email=req.body.email
    var otp=req.body.otp

    bankmodal.findOne({$and:[{"email":email},{"otp":otp}]}).then((found)=>{
        //var ts = found.createdtime;
        console.log(ts)
        if(timediff(ts)){
            res.json({
                "Message":"Sorry OTP expired",
            })
            bankmodal.updateOne({"_id":found._id},{$set:{"counter":1},$set:{"otp":null}}).then((updt)=>{
                console.log(updt)
            })
        }
        else{
            res.json({
                "Message":"Sorry OTP expired",
            })
        }
        console.log(timestamp)
        
    })

    // bankmodal.updateOne({"email":email},{'$set':{"otp":null}}).then((latest)=>{
    //     console.log(found.otp)
    // })
}
//-----------Time difference -------------
// var timediff=function(ts){
//     const millis = Date.now() - timestamp;
//     fixtime=Math.floor(millis*60/1000)
//     if(fixtime>1)
//     return true;
//     else
//     return false;
//   //console.log(`seconds elapsed = ${Math.floor(millis/1000)}`);
//   // expected output : seconds elapsed = 2
// }




//--------------Withdraw Amount 