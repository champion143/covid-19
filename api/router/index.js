var express=require('express')
var route=express.Router()
var user= require('../controller/user')
var admin= require('../controller/admin')
var food=require('../controller/food')
var fuel=require('../controller/fuel')
var student=require('../controller/student')
var cart=require('../controller/cart')
var bank=require('../controller/bank')
var test = require('../controller/test')
var csvfile_db=require('../controller/csvdata')
var venue=require('../controller/venue')


// --------------------User_Module--------------------------
route.post('/validatenumber',user.validatenumber)

route.post('/upload',user.file_upload);

route.post('/register',user.register);

route.post('/login',user.login);

route.post('/temperature',user.temperature);

route.post('/answer',user.giveanswer);

route.post('/alert',user.alert);

route.post('/edit',user.edit);

route.post('/view',user.viewone);

route.get('/view',user.viewall);

route.post('/delete',user.delete);

route.post('/updtpass',user.updtpass);

//  ------------------Admin------------
route.post('/question',admin.addquestion);

route.post('/adddoctor',admin.adddoctor);

// ---------------------------Venue----------------------------

route.post('/venueregister',venue.register);

// --------------------------PRODUCT-----------------------------

route.post('/productreg',food.productreg);
route.post('/productview',food.productview);
route.post('/addmenu',food.addmenu);
route.post('/delmenu',food.delmenu);

route.post('/cart1',cart.cart1);
route.post('/addtof',cart.addtof);
route.get('/showfav',cart.showfav);
route.post('/rating',cart.rating);
route.post('/addlike',cart.addlike)
route.post('/comment',cart.comment)
// --------------------------FUEL-----------------------------

route.post('/totalfuel',fuel.totalfuel);
route.post('/avgrate',fuel.avgrate);

//-----------------------Student----------------------------
route.post('/studentreg',student.reg);
route.post('/increment',student.incr);
//-------------------------
route.post('/csvfilemdb',csvfile_db.database);
// route.get('/',function(req,res)=>{

// })
//-----------BANK-----------------------
route.post('/getdet',bank.getdet)
route.post('/banklogin',bank.login)
route.post('/otp',bank.checkotp)
module.exports=route;   

// ----------- TEST
route.post('/test',test.insert)