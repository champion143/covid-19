var usermodal=require('../model/csvdata')

// module.exports.database=(req,res)=>{
//     var year=req.year;
//     var bg=req.bg;
//     var mg=req.mg;

// }

//var railway=require('../model/csvdata')
const csv = require('csv-parser');
const fs = require('fs');
const multer = require('multer');
//var moment = require('moment');
//var myDate = new Date();
//var date = moment(myDate).format('LL');
const mongoose = require('mongoose');
//const csvReferList=require('../models/csvReferList')
//const ReceiverList = require('../models/ReceiverList');
//const upload_path = "https://tms-frontend.netlify.com";

// var console = new (require("my-console")).Console();
// var logger = new (require("./log")).PlanningLoad();
// console.Level = logger.Level;
// console.datetime = logger.datetime;
// console.fileName = logger.fileName;
// console.lineNumber = logger.lineNumber;
// console._repeater = logger._repeater;



//------------------------csvFileUpload------------------------
// module.exports.database= (req, res) => {

//     //Storage the folder functionality
//     console.log("1")
//     var storage = multer.diskStorage({
//     destination: function(req, file, cd) {
//     cd(null, 'uploads') //todo upload/
//     },
//     filename: function(req, file, cd) {
//     cd(null,file.originalname)
//     }
    
//     })
//     // new Date().toISOString()+
//     //upload the file function
//     var upload = multer({
//     storage: storage
//     }).any('');
// console.log(upload)
// upload(req, res, function(err) {
// if (err) {
// console.info("upload",err)
// res.send(err)
// } else {

// var imagename = req.file;
// console.log(imagename)
// const map1 = imagename.map((file_data) => {

// var filepath =file_data.path;
// console.log("5")
// console.log(filepath)

// // await csvConverts(file_data.path,id)


// fs.unlink(filepath,(err)=>{
// if(err){
// console.error(err)
// }else{
// console.info("CSV uploaded")
// res.json({
// "success": 'True',
// "message": 'CSV uploaded',
// "imageurl": imageurl,
// "file_data": file_data
// }); }})

// })
// }
// })
// }




var storage = multer.diskStorage({
    destination: function(req, file, cd) {
    cd(null, 'uploads') //todo upload/
    },
    filename: function(req, file, cd) {
    cd(null,file.originalname+Date.now())
    }
    
    })
    // new Date().toISOString()+
    //upload the file function
    var upload = multer({
    storage: storage
    }).any('');


module.exports.database = (req, res) => {
    return new Promise((resolve, reject) => {
    upload(req, res, function (err) {
    if (err) {
    const Data = {
    "success": false,
    "message": 'Error 2'
    }
    resolve(Data)
    console.info("upload",err)
    //res.send(err)
    } else {
    var imagename = req.files;
    const map1 = imagename.map((file_data) => {
    var filepath = file_data.path;
    console.log(filepath)
    csvConverts(file_data.path)
    res.json({
    "success": 'True',
    "message": 'file uploaded',
    "file_data": file_data.path
    })
})
    }
    
    })
})
}



//------------------------CSV file Convert Data function------------------------

var csvConverts = function csvFileToConvertData(csvData){
    var count=0
    let csvUrl = csvData;
    fs.createReadStream(csvUrl).pipe(csv({mapHeaders: ({ header, index })=>header.trim()})).on('data',async(row)=>{
        console.info("Show CSV data ",row);
        new usermodal({
            "Year":row.Year,
            "Broad_Gauge":row.Broad_Gauge,
            "Metre_Gauge":row.Metre_Gauge,
            "Narrow_Gauge":row.Narrow_Gauge,
            "Total":row.Total
        }).save().then((data)=>{
            console.info("CSV file successfully processed",data)
            var success=({"success": true, "message": "CSV file successfully processed"})
            return success;
            })
    })
}


//
//------------------------CSV file Convert Data function------------------------


// var csvConverts = function csvFileToConvertData(csvData,referId) {
// // console.log(referId)
// var count=0;
// let csvUrl = csvData;
// fs.createReadStream(csvUrl)
// .pipe(csv({
// mapHeaders: ({ header, index })=>header.trim()
// }))
// .on('data', async (row) => {
// console.info("Show csv data",row);

// receiverList(row['Receiver Name'],row['Destination Address'], row['Destination City'], row['Destination State'], row['Receiver Zip Code'])

// const planningload = new planningLoad({
// "Pallets": (row.Pallets) ? (row.Pallets) : '0',
// "Weight": (row['Weight ']) ? (row['Weight ']) : (row['Weight']) ? (row['Weight']) :'0',
// "Cases": (row.Cases) ? row.Cases : '',
// "Temp": (row.Temp_Type) ? row.Temp_Type : '',
// "Load": (row['Load ID']) ? row['Load ID'] : '',
// "Notes":(row.Notes) ? row.Notes : '',
// // "Date":
// }).save().then((data)=>{
// console.info("CSV file successfully processed",data)
// var success=({"success": true, "message": "CSV file successfully processed"})
// return success;
// // }
// })
// })
// }
// }else{
// planningLoad.updateMany({Load:row['Load ID']},
// { $set:{'referId':referId} }).then((data)=>{
// })
// } })
