const express= require("express");
const connectDB=require("./config/database");
const app=express();
const User=require("./models/user");
const req = require("express/lib/request");
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
app.post("/signup",async (req,res)=>{
    const user= new User(req.body);
    try{
        await user.save();
        res.send("user added successfully");   
    }
    catch(err){
        res.status(400).send("Can't add user"+ err.message);
    }

});

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
    

})
//get all users 
app.get("/feed",async (req,res)=>{
    try{
        const users= await User.find();
        res.send(users);
}
    catch(err){
        res.status(404).send("Something went wrong"+ err.message);
    }


})





