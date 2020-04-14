var express=require('express')
var bodyParser=require('body-parser')
var mongoose =require('mongoose')
var bcrypt=require('bcrypt')
var path=require('path')
var app=express()
var multer= require('multer')
require('dotenv').config()
var routers=require('./api/router/index')
var fs=require('fs')
var jwt=require("jsonwebtoken")
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use(express.static('uploads'))


app.get('/',function(req,res)
{
    console.log(req.body.name)
    res.send("Name inserted")    
})
app.use('/api',routers)



mongoose.connect ( process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
},console.log("MongoDB Connected at 27017"));
app.listen(process.env.PORT,console.log("3000"))