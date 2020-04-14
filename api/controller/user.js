var usermodel=require('../model/user')
var addressmodel=require('../model/address')
var temperaturemodel=require('../model/temperature')
var answermodel=require('../model/answer')
var alertmodel=require('../model/alert')
var userqrmodel=require('../model/userqr')
var bcrypt=require("bcrypt")
var token;
var jwt=require("jsonwebtoken")
var multer= require('multer')
var message = require('../helper/message')
var libphonenumber = require('libphonenumber-js');
var otpGenerator = require('otp-generator')

const { response } = require('../../lang/index')

const translatte = require('translatte');

//--------------------Register----------------------------------
module.exports.register=(req,res)=>{
    var firstname=req.body.firstname;
    var lastname = req.body.lastname;
    var mobile=req.body.mobile;
    var email=req.body.email;
    var address1 = req.body.address1;
    var address2 = req.body.address2;
    let img = req.body.img;
    let photoId_no = req.body.photoId_no;
    let venue_id = req.body.venue_id;
    let type = req.body.type;
    let countrycode = req.body.countrycode;
    let otp = otpGenerator.generate(6, { upperCase: false, specialChars: false });
    //var password=req.body.password;
    //bcrypt.hash(password, salt, function(err, hash) {
    var address=req.body.address;
    let lng = req.headers.lng;
    usermodel.findOne({"mobile":req.body.mobile}).then((found)=>{
        if(found==null){
            console.log(firstname)
            new usermodel({
                "firstname":firstname,
                "lastname":lastname,
                "mobile":mobile,
                "email":email,
                "is_verify":1,
                "img" : img,
                "photoId_no": photoId_no,
                "venue_id":venue_id,
                "type":type,
                "countrycode":countrycode
            }).save().then((data)=>{
                let user_id = data._id;
                new addressmodel({
                    "address1":address1,
                    "address2":address2,
                    "user_id":user_id
                }).save().then((value)=>{
                    let message = '';
                    translatte(response.message.success.registersuccess, {to: lng}).then(res1 => {
                        message = res1.text;
                        res.json({
                            "status":response.message.success.statusCode,
                            "success":true,
                            "message":message,
                            "Data":data,
                            "otp" : otp,
                            "address":value
                        })

                    }).catch(err => {
                        console.error(err);
                    });
                })
                
            })

        }else{
            let message = '';
            translatte(response.message.error.useralertexist, {to: lng}).then(res1 => {
                message = res1.text;
                res.json({
                    "status":response.message.error.statusCode,
                    "success":false,
                    "message":message
                }) 

            }).catch(err => {
                console.error(err);
            });
        }
    })
//});
}
//----------------------------------Login---------------------------------------

module.exports.login=(req,res)=>{
    let otp = otpGenerator.generate(6, { upperCase: false, specialChars: false });
    let lng = req.headers.lng;
    usermodel.findOne({"mobile":req.body.mobile}).then((found)=>{
        if(found==null){
            let message = '';
            translatte(response.message.error.wronglogincredetial, {to: lng}).then(res1 => {
                message = res1.text;
                res.json({
                    "status":response.message.error.statusCode,
                    "success":false,
                    "message":message
                })
            }).catch(err => {
                console.error(err);
            });
        }else{
        token = jwt.sign({
            id: found._id,
            mobile:found.mobile,
            email:found.email,
        }, 'secret', { expiresIn: '2h' });
        let message = '';
        translatte(response.message.success.loginsuccess, {to: lng}).then(res1 => {
            message = res1.text;
            res.json({
                "status":response.message.success.statusCode,
                "success":true,
                "message":message,
                "token":token,
                "Data":found,
                "otp" : otp,
            })  
        }).catch(err => {
            console.error(err);
        });
    }
})
}

//---------------------------Give Answer----------------------------------------->
module.exports.giveanswer=(req,res)=>{
    let AllAnswer = req.body;
    let user_id;
    let answer;
    let count = AllAnswer.length;
    let lng = req.headers.lng;
    for(let i = 0; i < AllAnswer.length; i++ )
    {
        user_id = req.body.user_id;
        answer = req.body.answer;
        new answermodel({
            "user_id":user_id,
            "answer":answer
        }).save().then((data)=>{
            if(i == (count-1))
            {
                let message = '';
                translatte(response.message.success.answersuccess, {to: lng}).then(res1 => {
                    message = res1.text;
                    res.json({
                        "status":response.message.success.statusCode,
                        "success":true,
                        "message":message,
                        "message":"Anser Successful",
                        "Data":data
                    })
                }).catch(err => {
                    console.error(err);
                });

            }
        })
    }
}

//---------------------------Temperature----------------------------------------->
module.exports.temperature=(req,res)=>{
    let user_id = req.body.user_id;
    let temperature = req.body.temperature;
    let date = req.body.date;
    let status = req.body.status;
    let venue_id = req.body.venue_id;
    let type = req.body.type;
    let lng = req.headers.lng;
    new temperaturemodel({
        "user_id":user_id,
        "temperature":temperature,
        "date":date,
        "status":status,
        "venue_id":venue_id,
        "type":type
    }).save().then((data)=>{
        let message = '';
        translatte(response.message.success.temperatureupdated, {to: lng}).then(res1 => {
            message = res1.text;
            res.json({
                "status":response.message.success.statusCode,
                "success":true,
                "message":message,
                "Data":data
            })
        }).catch(err => {
            console.error(err);
        });
    })

}

//---------------------------Alert----------------------------------------------->
module.exports.alert=(req,res)=>{
    let status = req.body.status;
    let date = req.body.date;
    let location = req.body.location;
    let user_id = req.body.user_id;
    let lng = req.headers.lng;
    new alertmodel({
        "status":status,
        "date":date,
        "location":JSON.stringify(location),
        "user_id":user_id
    }).save().then((data)=>{
        let message = '';
        translatte(response.message.success.alertmark, {to: lng}).then(res1 => {
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

//---------------------------User Qr--------------------------------------------->
module.exports.userqr=(req,res)=>{
    let user_id = req.body.user_id;
    let peroid = req.body.peroid;
    let is_expire = req.body.is_expire;
    let venue_id = req.body.venue_id;
    let lng = req.headers.lng;
    let qr = otpGenerator.generate(6, { upperCase: false, specialChars: false });
    new userqrmodel({
        "user_id" : user_id,
        "peroid" : peroid,
        "is_expire" : is_expire,
        "venue_id" : venue_id,
        "qr" : qr
    }).save().then((Data)=>{
        translatte(response.message.success.qrgeneratesuccess, {to: lng}).then(res1 => {
            message = res1.text;
            res.json({
                "status":response.message.success.statusCode,
                "success":true,
                "message":message,
                "Data":Data,
            })
        }).catch(err => {
            console.error(err);
        });
    })
}

//--------------------------check phone number with country code------------------>
module.exports.validatenumber=(req,res)=>{
    let countrycode = req.body.countrycode;
    let phonenumber = req.body.phonenumber;

    let number = countrycode+phonenumber;
    let lng = req.headers.lng;

    if(new libphonenumber.parsePhoneNumber(number).isValid()){

        let message = '';
        translatte(response.message.success.validphonenumber, {to: lng}).then(res1 => {
            message = res1.text;
            res.json({
                "status":response.message.success.statusCode,
                "success":true,
                "message": message,
            })
        }).catch(err => {
            console.error(err);
        });

    }else{
        let message = '';
        translatte(response.message.error.invalidphonenumber, {to: lng}).then(res1 => {
            message = res1.text;
            res.json({
                "status":response.message.error.statusCode,
                "success":false,
                "message":message
            })
        }).catch(err => {
            console.error(err);
        });

        
    }
}

//--------------------------Update---------------------------
module.exports.edit=(req,res)=>{
    var email=req.body.email
    var password=req.body.password
    var mobile=req.body.mobile
    usermodel.findOne({"email":email}).then((found)=>{
        if(found!=null)
        {   
            bcrypt.compare(password,found.password, function(err, result) {
                if(result==true)
                {
            usermodel.updateOne({"email":email},{$set:{"mobile":mobile}}).then((data)=>{
                res.json({
                    "Data":data,
                    "message":"Updation Successful"
                })
            })
        
        }
        else{
            res.json({
                "Success":false,
                "message":"Wrong Password!! Cannot update details"
            })
        }
    })
}
            
else{
    res.json({"message":"Sorry wrong Email ID"})
    }
})
}

//----------------------------ViewOne-------------------------------
module.exports.viewone=(req,res)=>{
    usermodel.findOne({"email":req.body.email}).then((data)=>{
        if(data!=null)
        {
        res.json({
            "Data":data})
        }
        else
        {
        res.json({
            "Message":"Sorry couldn't Find your Email address"})
                
        }

})
}

//--------------------------------ViewAll-------------------------------
module.exports.viewall=(req,res)=>{
        usermodel.find().then((data)=>{ 
        res.json({
            "Data":data
    })
})
}
//--------------------------------Delete----------------------------------
module.exports.delete=(req,res)=>{
    var mobile=req.body.mobile
    usermodel.findOne({"mobile":mobile}).then((found)=>
    {
        if(found!=null)
        {
            usermodel.deleteOne({"mobile":req.body.mobile}).then((data)=>{
                //console.log(mobile)
                res.json({
                    "message":"data deleted",
                    "Data":data
                })
            })
        }
        else{
            res.json({
                "message":"Wrong Mobile number!! data  couldn't be deleted"
            })

        }
    })

}
//-----------------------------Reset Password---------------------------
module.exports.updtpass=(req,res)=>{
    salt=5
    var email=req.body.email
    var newpassword=req.body.newpassword
    var oldpassword=req.body.oldpassword
    usermodel.findOne({"email":email}).then((found)=>{
        if(found!=null)
        {   
            bcrypt.compare(oldpassword,found.password, function(err, result) {
                if(result==true){
                    bcrypt.hash(newpassword, salt, function(err, hash){
                    usermodel.updateOne({"email":email},{$set:{"password":hash}}).then((data)=>{
                    res.json({
                    "Data":data,
                    "message":"Password Updation Successful"})
            })
        })
        
        }

        else{
            res.json({
                "Success":false,
                "message":"Wrong Password!! Cannot update details"
            })
        }
    })
}
    else{
        res.json({
            "Success":false,
            "message":"Sorry couldn't Find your Email address"})
        }
    })
}

//----------------------------Image Upload------------------------------
//Storage the folder functionality
var storage = multer.diskStorage({
    destination: function(req, file, cb) {
            if(file.mimetype == 'image/jpeg' || 'image/png'){
                cb(null, 'uploads/');
            }else{
                return cb({'success':false,'message':'Only png, jpeg file can upload'});
            }
        },
        filename: function(req, file, cd) {
        var f1 = file.originalname;
        var text = f1.split('.')[1];
        var finle_name = Math.random()+'.'+text;
        cd(null, finle_name)
    }
})
    
//upload the file function
var upload = multer({
        storage: storage
}).any('');
    
module.exports.file_upload = (req, res) => {
    let lng = req.headers.lng;
    upload(req, res, function (err) {
        if (err) {
            res.json({
                "status":response.message.error.statusCode,
                "success":false,
                "message":err
            })
        } else {
            var imagename = req.files;
            const path = imagename[0].filename;
            const map1 = imagename.map(data => {
            //var imageurl = "http://3.132.68.85:3000/"+path;
            var imageurl = req.protocol + "://" + req.headers.host + '/' + path;
            // var imageurl = process.env.IMG+':'+process.env.PORT+'/'+path;

            let message = '';
            translatte(response.message.success.imageuploadsuccess, {to: lng}).then(res1 => {
                message = res1.text;
                res.json({
                    "status":response.message.success.statusCode,
                    "success":true,
                    "message": message,
                    "path":path,
                    "imageurl": imageurl,
                })
            }).catch(err => {
                console.error(err);
            });  
            })
        }
    })
}