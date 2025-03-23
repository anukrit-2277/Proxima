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
        res.send("user added successfully");   
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
     //   console.log(user._id)
       // const token=await jwt.sign({_id:user._id},"DevTinder@2277"); //hide/encapsulate the id, will be used to verify user
       // console.log(token)
       const token=await user.getJWT();        //using methods specific to instance of class
        res.cookie("token",token);
        res.send("user logged in");
    }
    catch(err){
        res.status(400).send("Invalid credentials"+err)
    }     
});

authRouter.post("/logout",async(req,res)=>{
    res.cookie( "token",null,{expires: new Date(Date.now())}).send("logout successfull!!");
})
module.exports=authRouter;


