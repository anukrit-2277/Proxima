const {userAuth}=require("../middlewares/auth");
const express=require("express");
const User=require("../models/user");
const profileRouter=express.Router();
const {validateEditProfileData, validateSignUpData}=require("../utils/validation");
const bcrypt=require("bcrypt");
const validator=require("validator");

profileRouter.get("/profile/view",userAuth, async(req,res)=>{
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

profileRouter.patch("/profile/edit",userAuth,async (req,res)=>{
   try{ 
    const isValidFields=validateEditProfileData(req);
    if(!isValidFields){
        throw new Error("Enter Valid Input fields");
    }
    const loggedInUser=req.user;
    Object.keys(req.body).forEach((key)=>loggedInUser[key]=req.body[key]);
    await loggedInUser.save();
    // console.log(loggedInUser);
    res.json({message:`${loggedInUser.firstName},your profile updated successfully`,
        data:loggedInUser
    });
   }
   catch(err){
    res.status(400).send(err.message);
   }
});

profileRouter.post("/profile/changePassword",userAuth,async(req,res)=>{
    //authenticate current password
    //then take new pswd ip
    //validate new password
    //hash it and add to db
    try{
        const user=req.user;    
        const {password,newPassword}= req.body;
        const isValidPassword=await user.validatePassword(password);
       // console.log(isValidPassword);
        if(!isValidPassword){
            throw new Error("Invalid Password");
        }
        const isStrongPassword=validator.isStrongPassword(newPassword);
        if(!isStrongPassword){
            throw new Error("Enter Strong Password");
        }
        user.password=await bcrypt.hash(newPassword,10);
       await user.save();
       res.send("password updated successfully")   
}
catch(err){
    res.status(400).send("Error"+err.message);
}
    



  


})


module.exports=profileRouter;