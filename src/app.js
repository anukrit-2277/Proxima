const express= require("express");
const app=express();


app.use("/home",(req,res)=>{
    res.send("hiii");
})
app.listen(700,()=>{
    console.log("server is listening");
})
app.listen(1700,()=>{
    console.log("server is listening");
})