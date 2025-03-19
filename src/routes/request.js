const {userAuth}=require("../middlewares/auth");
const express=require("express");
const requestRouter=express.Router();

requestRouter.post("/sendconnectionrequest",userAuth,async(req,res)=>{
    res.send("connection req sent");
});

module.exports=requestRouter;