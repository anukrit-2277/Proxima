const {validateSignUpData}=require("../utils/validation");
const User=require("../models/user");
const bcrypt=require("bcrypt");
const express=require("express");
const authRouter=express.Router();

authRouter.post("/signup",async (req,res)=>{
    const {firstName,lastName,emailId,password} =req.body;
    try{
        //validate the user
        validateSignUpData(req);
        //encrypt password
        const passwordHash=await bcrypt.hash(password, 10);

        //creating instance of User schema
        const user= new User({
            firstName,
            lastName,
            emailId,
            password:passwordHash
    });
        await user.save();
        res.json({
            message:"User added successfully",
            data:user
        });   
    }
    catch(err){
        res.status(400).send("Can't add user" +" "+ err.message);
    }

});

authRouter.post("/login",async (req,res)=>{
    const {emailId,password}=req.body;
    try{
        const user= await User.findOne({emailId});
        if(!user){
            throw new Error("invalid credentials");
        }
       // const isValidPassword=await bcrypt.compare(password, user.password);
        const isValidPassword=await user.validatePassword(password);
//        console.log(isValidPassword)
        if(!isValidPassword){   
            throw new Error("Invalid credentials");
        }

       const token=await user.getJWT();        //using methods specific to instance of class
        res.cookie("token",token);
        res.json({
            message:"User loggedIn successfully",
            data:user
        }); 
    }
    catch(err){
        res.status(400).send("Invalid credentials"+err)
    }     
});

authRouter.post("/logout",async(req,res)=>{
    res.cookie( "token",null,{expires: new Date(Date.now())}).json({message:"logout successfull!!"});
})
module.exports=authRouter;


