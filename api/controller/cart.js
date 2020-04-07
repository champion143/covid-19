var cartmodal=require('../model/cart')
var bill=0
var fav=new Array;
//------------------------Add to cart-------------------------------
module.exports.cart1=(req,res)=>{
    var Category=req.body.Category;
    var cuisine=req.body.cuisine;
    var item= req.body.item;
    var cost=req.body.cost;
    //var favourite=req.body.favourite;
    cartmodal.move.findOne({$and:[{"Category":Category},{"cuisine":cuisine}]}).then((found)=>{
        //console.log(found._id)
        if(found!=null){
            cartmodal.updateOne({ "_id":found._id},{'$push':{'item':item}}).then((found)=>
            {
                console.log(found.item)
                bill=bill+cost;
                console.log(bill)
                res.json({
                    "Data":found,
                    "message":"Updated to cart, Your Total Bill to pay ",
                    "Payment":bill})
            })
        }
        else{
            new cartmodal({
                "Category":Category,
                "cuisine":cuisine,
                "item":item,
                "cost":cost,
                //"favourite":favourite
            }).save().then((data)=>{
                console.log(item)
                bill=bill+cost;
                res.json({
                    "success":true,
                    "message":"Cart created and added to cart",
                    "Data":data,
                    "Payment":bill})
        })
    }
        
    
})
}

//------------------------Add To favourite--------------------,

module.exports.addtof=(req,res)=>{
    var Category=req.body.Category;
    var cuisine=req.body.cuisine;
    var favitem= new Array;
    favitem=req.body.favitem;

    cartmodal.findOne({$and:[{"Category":Category},{"cuisine":cuisine}]}).then((found)=>{
            if(found!=null){
                console.log(found)
            cartmodal.updateOne({ "_id":found._id},{'$addToSet':{'favitem':[favitem]}}).then((data)=>
                {   cartmodal.updateOne({"_id":found._id},{'$set':{"favourite":true}}).then((vag)=>{

                
                    console.log(vag)
                    res.json({
                    "Message":"Item updated to your favourite list",
                    "data":vag})
                })
                    })
                }
                else{
                    res.json({
                        "Message":"Sorry wrong information"
                    })
                }

    })
}

//-----------------------Show favourite--------------------
module.exports.showfav=(req,res)=>{
    cartmodal.find({"favourite":true}).then((data)=>
    {       res.json({
            "Message":"Your favourite list",
            "data":data})
    })
}

//-----------------------Ratings--------------------
module.exports.rating=async(req,res)=>
{
    var Category=req.body.Category;
    var cuisine=req.body.cuisine;
    var ratings=req.body.rating;
    var sum=0;
    avgr=0;
    await cartmodal.findOne({$and:[{"Category":Category},{"cuisine":cuisine}]}).then(async(found)=>{
        if(found!=null){
            var tt=found
            await cartmodal.updateOne({"_id":found._id},{'$push':{"ratings":[ratings]}}).then(async(data)=>{
               console.log(data)
            
               var g=found.ratings
               console.log(g)
                console.log(g.length)
            for(var i in found.ratings){
                sum=sum+found.ratings[i]
                console.log(found.ratings[i])
                }
                console.log(sum)
                console.log(i)
                avgr=sum/g.length
                console.log(avgr)
                    res.json({
                    "Message":"Average ratings of this category and cuisine is ",
                     "Average":avgr })
                
            })
        }
        })
    }
//---------------------------Like-------------
module.exports.addlike=(req,res)=>{
    var Category=req.body.Category;
    var cuisine=req.body.cuisine;
    var like=req.body.like;
  

    cartmodal.findOne({$and:[{"Category":Category},{"cuisine":cuisine}]}).then((found)=>{
        if(like=='yes')
        {
            cartmodal.updateOne({"_id":found._id},{'$inc':{likes:1}}).then((data)=>{
                res.json({
                    "success":true,
                    "Message":"Like has been added",
                    "data":data
                })
            })
        }
    })
}
//------------------------Comments-------------
    module.exports.comment=(req,res)=>{
        var Category=req.body.Category;
        var cuisine=req.body.cuisine;
        var comment=req.body.comment;
    
        cartmodal.findOne({$and:[{"Category":Category},{"cuisine":cuisine}]}).then((found)=>{
           if(comment!=null)
            {
                comment=(found.comment.length+1)+"->"+comment
                console.log(found)
                cartmodal.updateOne({"_id":found._id},{'$push':{"comment":comment}}).then((data)=>{
                            res.json({
                                "success":true,
                                "Message":"Comment has been added",
                                "data":data
                            })
                })
            }
        })
    }
