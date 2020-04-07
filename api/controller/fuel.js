var usermodal=require('../model/fuel')
//-----------------Total Fuel--------------

module.exports.totalfuel=(req,res)=>{
    var rate=req.body.rate;
    var amount=req.body.amount;
    var day=req.body.day;
    var totalfuel=amount*1000/rate;
    
    console.log(totalfuel)
    new usermodal({
        "rate":rate,
        "ml":"1000 ml",
        "day":day,
        "amount":amount,
        "totalfuel":totalfuel
    }).save().then((data)=>{
        res.json({
            "message":"Your total fuel intake is ",
            "Data":data})
    })
}

//----------------Avg fuel---------------------
module.exports.avgrate=(req,res)=>{
    var avgr;
    var sum=0;

    usermodal.find().then((data)=>
    {
       // avgr(data[0].rate+data[1].rate+data[2].rate+data[3].rate+data[4].rate)/5
     for(i=0;i<5;i++)
     {
        sum=sum+data[i].rate
     }
     console.log(sum)
     avgr=sum/5
            res.json({
        "message":"Average of last five day fuel rate is",
        "Average": avgr
         })
        
    
})
}
