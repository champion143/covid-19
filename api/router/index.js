var express=require('express')
var route=express.Router()
var user= require('../controller/user')
var admin= require('../controller/admin')
var test = require('../controller/test')
var venue=require('../controller/venue')

const {userAuthenticator} = require('../../middlewares/authenticator');

// --------------------User_Module--------------------------
route.post('/validatenumber',user.validatenumber)

route.post('/upload',user.file_upload);

route.post('/register',user.register);

route.post('/login',user.login);

route.post('/temperature',[userAuthenticator],user.temperature);

route.post('/answer',[userAuthenticator],user.giveanswer);

route.post('/alert',[userAuthenticator],user.alert);

route.post('/edit',[userAuthenticator],user.edit);

route.post('/view',user.viewone);

route.get('/view',user.viewall);

route.post('/delete',user.delete);

route.post('/updtpass',user.updtpass);

route.post('/userqr',[userAuthenticator],user.userqr);
//  ------------------Admin------------
route.post('/question',[userAuthenticator],admin.addquestion);

route.post('/adddoctor',[userAuthenticator],admin.adddoctor);

// ---------------------------Venue----------------------------

route.post('/venueregister',venue.register);

// ----------- TEST
route.post('/test',test.insert)

module.exports=route;   

