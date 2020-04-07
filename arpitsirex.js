const planningLoad = require('../models/planningLoad');
const util = require('../util');
const csv = require('csv-parser');
const fs = require('fs');
const multer = require('multer');
var moment = require('moment');
var myDate = new Date();
var date = moment(myDate).format('LL');
var request = require("request");
var distance = require('google-distance-matrix');
distance.key('AIzaSyBu1k2yC7Z8cJ0NMrVVpDf5mpifPe6irCo');
distance.units('metric');
const mongoose = require('mongoose');
const csvReferList=require('../models/csvReferList')
const ReceiverList = require('../models/ReceiverList');
const upload_path = "https://tms-frontend.netlify.com";

var console = new (require("my-console")).Console();
var logger = new (require("./log")).PlanningLoad();
console.Level = logger.Level;
console.datetime = logger.datetime;
console.fileName = logger.fileName;
console.lineNumber = logger.lineNumber;
console._repeater = logger._repeater;

//Storage the folder functionality
var storage = multer.diskStorage({
destination: function(req, file, cd) {
cd(null, '') //todo upload/
},
filename: function(req, file, cd) {
cd(null,file.originalname)
}

})
// new Date().toISOString()+
//upload the file function
var upload = multer({
storage: storage
}).any('');

//------------------------csvFileUpload------------------------
module.exports.csvFileUpload = (req, res) => {
var userId = req.user.id
var referId;
// var startDate =req.query.startDate;
// var endDate=req.query.endDate;
var name=req.query.name;
var type=req.query.type;
// var fileType=req.query.type;
upload(req, res, function(err) {
if (err) {
console.info("upload",err)
res.send(err)
} else {
var imagename = req.files;
const map1 = imagename.map((file_data) => {

var filepath =file_data.path;
var CSVReferList =new csvReferList({
'userId':userId,
'fileType':"csv",
'startDate':'',
'endDate':'',
'filePath': filepath,
'fileName':file_data.originalname,
'isfinalize':0,
'name':name,
'type':type
})
CSVReferList.save().then(async(data)=>{ console.log(data)
// referId=data._id
let id = data._id;
var imageurl = upload_path+file_data.path;
await csvConverts(file_data.path,id)


fs.unlink(filepath,(err)=>{
if(err){
console.error(err)
}else{
console.info("CSV uploaded")
res.json({
"success": 'True',
"message": 'CSV uploaded',
"imageurl": imageurl,
"file_data": file_data
}); }})
});
})
}
})
}
//
//------------------------CSV file Convert Data function------------------------
var csvConverts = function csvFileToConvertData(csvData,referId) {
// console.log(referId)
var count=0;
let csvUrl = csvData;
fs.createReadStream(csvUrl)
.pipe(csv({
mapHeaders: ({ header, index })=>header.trim()
}))
.on('data', async (row) => {
console.info("Show csv data",row);
// console.log()
receiverList(row['Receiver Name'],row['Destination Address'], row['Destination City'], row['Destination State'], row['Receiver Zip Code'])
//Load ID PO# Shipper No: Shipper Name Shipper Address Shipper City Shipper State Shipper Zip Code Receiver Name Destination Address Destination City Destination State Receiver Zip Code Pallets Cases Weight Carrier Delivery_Date Delivery_APT_Time Pickup_Date Pickup_APT_Time Pickup_status Temp_Type Sensor_status Temperature Status Notes

// if(row['Shipper Name']!='' && row['Shipper City']!='' && row['Shipper State']!='' && (row.Pallets)!='' && (row.Weight)!='')
// {

// planningLoad.find({Load:{'$eq':row['Load ID']}}).then((dat)=>{

// if(dat.length == 0){
const planningload = new planningLoad({
'fileType':'csv',
'processType':'0',
'referId':referId,
'consol_id':0,
'finalize':0,
'Shipper': (row['Shipper Name']) ? row['Shipper Name']: '',
"Destination": (row['Destination City']) ? row['Destination City']: '',
"State": (row['Destination State']) ? row['Destination State']: '',
"Pallets": (row.Pallets) ? (row.Pallets) : '0',
"Weight": (row['Weight ']) ? (row['Weight ']) : (row['Weight']) ? (row['Weight']) :'0',
"Cases": (row.Cases) ? row.Cases : '',
"Temp": (row.Temp_Type) ? row.Temp_Type : '',
"Load": (row['Load ID']) ? row['Load ID'] : '',
"PO": (row['PO#']) ? row['PO#'] : '',
"Carrier": (row.Carrier) ? row.Carrier : '',
"ConfDate": (row['Pickup_Date']) ? row['Pickup_Date'] : '',
"ConfTime": (row['Pickup_APT_Time'])? row['Pickup_APT_Time'] : '',
"Conf":(row['Conf# ']) ? row['Conf# '] : '',
"Shipper No:":(row['Shipper No:']) ? row['Shipper No:'] : '',
"Shipper Address":(row['Shipper Address']) ? row['Shipper Address'] : '',
"Shipper Zip Code":(row['Shipper Zip Code']) ? row['Shipper Zip Code'] : '',
"Receiver Name":(row['Receiver Name']) ? row['Receiver Name'] : '',
"Shipper City":(row['Shipper City']) ? row['Shipper City'] : '',
"Shipper State":(row['Shipper State']) ? row['Shipper State'] : '',
"Destination Address":(row['Destination Address']) ? row['Destination Address'] : '',
"Receiver Zip Code":(row['Receiver Zip Code']) ? row['Receiver Zip Code'] : '',
"Delivery_Date":(row['Delivery_Date']) ? row['Delivery_Date'] : '',
"Delivery_APT_Time":(row['Delivery_APT_Time']) ? row['Delivery_APT_Time'] : '',
"Pickup_status":(row['Pickup_status']) ? row['Pickup_status'] : '',
"Sensor_status":(row['Sensor_status']) ? row['Sensor_status'] : '',
"Temperature":(row.Temperature) ? row.Temperature : '',
"Status":(row.Status) ? (row.Status) : '',
"Notes":(row.Notes) ? row.Notes : '',
// "Date":
}).save().then((data)=>{
console.info("CSV file successfully processed",data)
var success=({"success": true, "message": "CSV file successfully processed"})
return success;
// }
})
// }else{
// planningLoad.updateMany({Load:row['Load ID']},
// { $set:{'referId':referId} }).then((data)=>{
// })
// } })
})
}

//------------------------function receiverList------------------------
var receiverList = function(name, address, city, state, zip) {
ReceiverList.find({consignee:{'$eq': name}}).then((data)=>{
if(data.length == 0){
new ReceiverList({
"consignee":name,
"address":address,
"city":city,
"state":state,
"zip":zip,
"openWindowTime":' ',
"closeWindowTime":' ',
}).save()
}
})
}



// localhost->// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkZDI4MmIxMWI2MWU5MmMzZmUzZjQyZiIsImVtYWlsIjoibW9kZUBnbWFpbC5jb20iLCJpYXQiOjE1NzQwNzcxMjEsImV4cCI6MTYwNTYxMzEyMX0.cs-k4mz3mBTNP2eXhObve2VihBhK-OuLFFwiOGMzghw
// Server->//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkODBlMTA3YWUzMmU4NTVmN2E5YmUyYSIsImVtYWlsIjoidGVzdDNAZ21haWwuY29tIiwiaWF0IjoxNTY5MzAyMTczLCJleHAiOjE2MDA4MzgxNzN9.y2zh05NqTtG5nzTKiwEUkLlE-L4aY-WS0VNxM7oiLQg