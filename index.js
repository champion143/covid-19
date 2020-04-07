var express=require('express')
var bodyParser=require('body-parser')
var mongoose =require('mongoose')
var bcrypt=require('bcrypt')
var path=require('path')
var app=express()
var multer= require('multer')
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
mongoose.connect('mongodb://localhost:27017/covid-19', {
  useNewUrlParser: true,
  useUnifiedTopology: true
},console.log("MongoDB Connected at 27017"));
app.listen(3000,console.log("3000"))