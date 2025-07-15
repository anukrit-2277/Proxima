const express= require("express");
const connectDB=require("./config/database");
const app=express();
const User=require("./models/user");
//const req = require("express/lib/request");
const {validateSignUpData}=require("./utils/validation");
const bcrypt=require("bcrypt");
const cookieParser=require("cookie-parser");
const jwt=require("jsonwebtoken");
const {userAuth}=require("./middlewares/auth");
const authRouter=require("./routes/auth.js");
const profileRouter=require("./routes/profile.js"); 
const requestRouter=require("./routes/request.js");
const userRouter = require("./routes/user.js");
const cors=require("cors");
require('dotenv').config()
const CORS_LINK=process.env.CORS_LINK;
const PORT=process.env.PORT;

connectDB().then( ()=>{
    console.log("DB connection established");
    app.listen(PORT,()=>{
        console.log("server is listening");
    });
}
).catch((err)=>{
    console.error("DB can't be connected");
});

app.use(cors(
    {
        origin:CORS_LINK,
        credentials:true 
    }
))
app.use(express.json());
app.use(cookieParser());
app.use("/",authRouter);
app.use("/",profileRouter);
app.use("/",requestRouter);
app.use("/",userRouter);


/*
//get user by email
app.get("/user",async (req,res)=>{
    const userEmail=req.body.emailId;
    try{
        const users=await User.find({emailId:userEmail}); //returns an arr, another method->findOne-. returns single obj
        if(users.length ===0){
            res.send("No user with given email");
        }
        else{
            res.send(users);
        }
        
    }                                           
    catch(err){
        res.status(404).send("Something went wrong"+ err.message);
    }
    

});


//get all users 
app.get("/feed",async (req,res)=>{
    try{
        const users= await User.find();
        res.send(users);
}
    catch(err){
        res.status(404).send("Something went wrong"+ err.message);
    }


});

//delete user

app.delete("/user", async(req,res)=>{
    const userId=req.body.userId;
    try{
        const user=await User.findByIdAndDelete(userId);
        console.log(user);
        res.send("user deleted");
    }
    catch(err){
        res.status(404).send("Something went wrong"+ err.message);

    }
});

//update user

app.patch("/user/:userId",async (req,res)=>{
    const userId=req.params?.userId;
    const updatedData=req.body;
    const data=req.body;
  //  console.log(updatedData);
    const ALLOWED_UPDATES=["userId","firstName","lastName","password","skills","about"];
    const isUpdateAllowed=Object.keys(data).every((k)=>ALLOWED_UPDATES.includes(k));
   

    try{
        if(!isUpdateAllowed){
            // throw new Error ("update not allowed");
            throw new Error("can't update");
         }
        const user=await User.findByIdAndUpdate(userId,updatedData,{ returnDocument: "after",
            runValidators:true,
         });
        console.log(user);
        res.send("user updated successfully")
    }
    catch(err){
        res.status(404).send("something went wrong "+err.message)

    }

});

*/
 









