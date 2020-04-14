var testmodel=require('../model/test')
const translate = require('google-translate-api');

const translatte = require('translatte');

//import { parsePhoneNumberFromString } from 'libphonenumber-js'
var libphonenumber = require('libphonenumber-js') 


module.exports.insert = (req,res1) => {

    

    translatte('Do you speak Russian?', {to: 'de'}).then(res => {
        console.log(res.text);
    }).catch(err => {
        console.error(err);
    });

    //let number = '+12133734253';
    //console.log(new libphonenumber.parsePhoneNumber(number).isValid());

   
    // let name = req.body.name;
    // testmodel.findOne({"name":name}).then((found) => {
    //     if(found == null)
    //     {
    //         new testmodel({
    //             "name" : name
    //         }).save().then((data)=>{
    //             res.json({
    //                 "success":true,
    //                 "message":"user inserted successfully"
    //             })
    //         })
            
    //     }else{
    //         res.json({
    //             "success":false,
    //             "message":"user Allready exists"
    //         })
    //     }
    // })
}