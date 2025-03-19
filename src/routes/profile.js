const {userAuth}=require("../middlewares/auth");
const express=require("express");
const profileRouter=express.Router();
profileRouter.get("/profile",userAuth, async(req,res)=>{
    try{ 
   /*  const cookies=req.cookies;
     const {token}=cookies;
    if(!token){
     throw new Error("invalid token");
     
     }
     const decoded=await jwt.verify(token,"DevTinder@2277");
     const user=await User.findById(decoded); //decoded->userId
 
     /*if(!user){
         res.send("no user found")
     };
    // console.log(user.firstName)
    // 
    */
    const user=req.user; 
    res.send(user);
 
 }
     catch(err){
         res.status(400).send("something went wrong"+err);
     }
 });

 module.exports=profileRouter;