const express=require("express");
const { userAuth } = require("../middlewares/auth");
const connectionRequest = require("../models/connectionRequest");
const user = require("../models/user");
const userRouter=express.Router();

const USER_SAFE_DATA=["firstName","lastName","skills","about","photoURL"];

//get all pending req of a user
userRouter.get("/user/requests/received",userAuth,async(req,res)=>{
    
    try{
        const {_id}=req.user;
        const toUserId=_id;
        const connectionRequests= await connectionRequest.find(
        { toUserId, status:"interested"}
    ).populate("fromUserId",USER_SAFE_DATA);
   
    res.json({
        message:"Data fetched successfully",
        data:connectionRequests
    });
    }
    catch(err){
        res.status(400).send("ERROR: "+err.message);
    }
});  

//get all connections of a user
userRouter.get("/user/connections",userAuth, async(req,res)=>{
    const loggedInUserId=req.user._id;
    //find all documents where from/to user id is of loggedInUser and status set as accepted
    //send those documents are response
    const userConnections=await connectionRequest.find(
        {
            $or:[
                {fromUserId:loggedInUserId,status:"accepted"},
                {toUserId:loggedInUserId,status:"accepted"}
            ]
        }
    ).populate("fromUserId",USER_SAFE_DATA).populate("toUserId",USER_SAFE_DATA);
    
    const trimmedData=userConnections.map((x)=>{
        if((x.fromUserId._id).equals(loggedInUserId)) return x.toUserId;
        return x.fromUserId;
    });

    res.json({
        message:"Fetched User Connections",
        data:trimmedData
    });

});

userRouter.get("/user/feed",userAuth,async(req,res)=>{
    try{
        const page= parseInt(req.query.page) ||1;
        let limit= parseInt(req.query.limit) || 3;
        limit >5 ?5:limit;
        const skip=(page-1)*limit;       
        const loggedInUser=req.user;
        const connectedUsers=await connectionRequest.find({
            $or:[{fromUserId:loggedInUser._id},{toUserId:loggedInUser._id}]
        }).select("fromUserId toUserId");
        //.populate("fromUserId",USER_SAFE_DATA).populate("toUserId",USER_SAFE_DATA);
       //console.log(connectedUsers);
       const hiddenUsersId=connectedUsers.map((x)=>{
            if(x.fromUserId.equals(loggedInUser._id)) return x.toUserId;
            return x.fromUserId;
       });
     //  console.log(loggedInUser._id);
       //console.log(hideUsersId)
       const userFeed= await user.find(
        {
            $and:[
                {_id: {$nin:hiddenUsersId}},
                {_id:{$ne:loggedInUser._id}}   
            ]       
        }
       ).select(USER_SAFE_DATA).skip(skip).limit(limit);    
     //  console.log(userFeed); 
       res.json({
        message:"Data fetched successfully",
        data:userFeed
       })
    }
    catch(err){
        res.status(400).json({
            message:"Error "+err.message
        });

    }

});
module.exports=userRouter;
