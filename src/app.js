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
//const {adminAuth,userAuth}=require("./middlewares/auth")
/*
app.use("/home",(req,res)=>{
    res.send("Welcome to home");
});*/
/*
app.get("/user",(req,res)=>{
    res.send({ firstName:"Anukrit", lastName: "Pundir" });

});
app.post("/user",(req,res)=>{
    //saving data to DB
    res.send("Data successfully saved to DB");
});

app.delete("/user",(req,res)=>{
    res.send("data deleted successfully")
})
*/
/*
app.use("/test",(req,res,next)=>{
    //route handler
    console.log("response 1")
    //res.send("Welcome to test");
    next();
    console.log("r1 log ");
},(req,res)=>{
    console.log("r2");
    res.send("Welcome to test2");

})
*/
/*
app.get("/test",(req,res,next)=>{
    console.log("r1");
    next();
});
app.get("/test",(req,res)=>{
    console.log("r2");
    res.send("r2 response")
});*/
/*
app.use("/admin",adminAuth,(req,res,next)=>{
   console.log("admin page");
    next();
});
app.get("/user/login",(req,res)=>{
    res.send("logged in page")
})

app.use("/user",userAuth,(req,res)=>{
    res.send("user authorized");
});

app.get("/admin/getAllData",(req,res)=>{
    res.send("admin data fetched");
});
*/
 /*  
app.get("/user",(req,res)=>{
try{
    throw new Error("new err");
}
catch{
    res.status(400).send("err");
}
 
})  
app.use("/",(err,req,res,next)=>{
    res.status(400).send("error")
})
*/


connectDB().then( ()=>{
    console.log("DB connection established");
    app.listen(1700,()=>{
        console.log("server is listening");
    });
}
).catch((err)=>{
    console.error("DB can't be connected");
});
app.use(express.json());
app.use(cookieParser());
app.use("/",authRouter);
app.use("/",profileRouter);
app.use("/",requestRouter);


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
 









