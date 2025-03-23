const {userAuth}=require("../middlewares/auth");
const express=require("express");
const requestRouter=express.Router();
const ConnectionRequest=require("../models/connectionRequest");
const User=require("../models/user")
requestRouter.post("/request/send/:status/:toUserId",userAuth,async(req,res)=>{
       try{
        const user=req.user;
        const fromUserId=user._id; 
        const toUserId=req.params.toUserId; //validate
       // console.log(toUserId)
        const toUser=await User.findById(toUserId);
       
        const status=req.params.status; 
        if(!toUser){
            throw new Error("Invalid id");
        }
        const validStatus=["interested","ignored"];
        const isValidStatus= validStatus.includes(status);
        if(!isValidStatus){
            throw new Error("Invalid Status")
        }
        const existingConnectionRequest=await ConnectionRequest.findOne({
            $or:[
                {fromUserId,toUserId},
                {fromUserId:toUserId, toUserId:fromUserId}
            ]

        });
       // console.log(existingConnectionRequest);
        if(existingConnectionRequest){
            throw new Error("connection already exists");
        }

        const connectionRequest= new ConnectionRequest(
            {
                fromUserId,
                toUserId,
                status

            }
        );
        await connectionRequest.save();
        res.json({
            message:`user set as ${status}`,
            data:toUser
        
        } );

       }
       catch(err){
        res.status(400).send("ERROR: "+err.message);
       } 
    
});
requestRouter.post("/request/review/:status/:requestId",userAuth,async(req,res)=>{
    try{
        const {status,requestId}=req.params;
       // console.log(status);
        const validStatus=["accepted","rejected"];
        const isValidStatus=validStatus.includes(status);
      //  console.log(isValidStatus);
        if(!isValidStatus){
            throw new Error("invalid status ");
            };
        const request=await ConnectionRequest.findById(requestId);
        const requestStatus=request.status;
        if(!request || !(requestStatus ==="interested")){  //this can be done via single query too (lookinto ref lecture to know)
            throw new Error("Invalid request");
        }
        const toUserId=request.toUserId;
        const loggedInUser=req.user._id;
      //  console.log(loggedInUser)
      //  console.log(toUserId)
        if(!loggedInUser.equals(toUserId)){
            throw new Error("Invalid User");
        }
        //valid user raised req to change the status;
        request.status=status;
        const data = await request.save();
        res.json({
            message:`request status: ${status}`,
            data
        });  
    }
    catch(err){
        res.status(400).send("ERROR: "+err.message);
    }
})


module.exports=requestRouter;