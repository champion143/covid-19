var usermodal=require('../model/student')
//-----------------Register student-------------

module.exports.reg=(req,res)=>{
    var batchid=req.body.batchid;
    var nos=req.body.nos;
    var completed=req.body.completed;
    var access=req.body.access;
    var info=req.body.info;
    if(nos<=50 && completed<nos){
    new usermodal({
        "batchid":batchid,
        "nos":nos,
        "completed":completed,
        "access":access,
        "info":info
    }).save().then((data)=>{
        
        res.json({
            "Success":true,
            "Data":data})
    })
}
    else{
        res.json({
            "Success":false,})
    }
}


//-------------------Increment----------------

module.exports.incr=(req,res)=>{
    var batchid=req.body.batchid;
    usermodal.findOne({"batchid":batchid}).then((found)=>{
        console.log(found.completed)
        if(found.completed<50){
        usermodal.updateOne({"batchid":batchid},{$inc:{"completed":1}}).then((data)=>{
            res.json({
                "success":true,
                "Message": "Incremented Sucessfuly",
                "Data":data
                    })
                    console.log(found)
            })
        }
        else{
            res.json({
                "Success":false,
                "Message":"Sorry batch capacity Exceeded"
            })
        }
})
}