var usermodal=require('../model/food')

//---------------------Food Menu------------

 module.exports.productreg=(req,res)=>{
    var Category=req.body.Category;
    var cuisine=req.body.cuisine;
    var menu= req.body.menu;
    console.log(req.body)
    usermodal.findOne({"Cuisine":req.body.cuisine}).then((found)=>{
        if(found==null)
        {   
            new usermodal({
                "Category":Category,
                "cuisine":cuisine,
                "menu":[menu]
            }).save().then((data)=>{
                console.log(menu)
                res.json({
                    "success":true,
                    "message":"This Cuisine Successfully Added",
                    "Data":data})

           })
           /*for(i in menu){
               console.log(menu[i][0])
               console.log(menu[0][0])
           }*/
        }
        else{
            res.json({
                "Message":"This Cuisine already exist"})
            }
})
}

//-------------------------------View Menu----------------------

module.exports.productview=(req,res)=>{
    //var Category=req.body.Category;
    var cuisine=req.body.cuisine;

    usermodal.findOne({"cuisine":cuisine}).then((found)=>{
        if(found!=null)
            {
                res.json({
                "data":found})
            }
        
        else{
            res.json({
                "Message":"No such cuisine exist"})
        }
    })
}

//-------------------------------Add Menu--------------------------
module.exports.addmenu=(req,res)=>{
    //var Category=req.body.Category;
    var cuisine=req.body.cuisine;
    var item=req.body.item;
console.log(cuisine,item)
    usermodal.findOne({"cuisine":cuisine}).then((found)=>{
        //console.log(found._id)    
        usermodal.updateOne({ "_id":found._id},{'$addToSet':{'menu.$[].menuList':{'$each':[ item ] } }}).then((found)=>
            {
                    ////console.log(item)
                    res.json({
                        "Data":found,
                        "message":"Updation Successful"  })
                })

            })
}
//-------------------------------Delete Menu--------------------------
module.exports.delmenu=(req,res)=>{
    //var Category=req.body.Category;
    var cuisine=req.body.cuisine;
    var item=req.body.item;
//console.log(cuisine,item)
    usermodal.findOne({"cuisine":cuisine}).then((found)=>{
        usermodal.updateOne({"_id":found._id},{'$pull':{'menu.$[].menuList':{'$in':[item]}}}).then((found)=>{
            res.json({
                "Data":found,
                "message":"Updation Successful"})
        })
    })
}