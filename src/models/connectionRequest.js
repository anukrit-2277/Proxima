const mongoose=require("mongoose");
const user = require("./user");

const connectionRequestSchema=new mongoose.Schema(
    {
        fromUserId:{
            type: mongoose.Types.ObjectId,
            required:true,
            ref:user
        },
        toUserId:{
            type: mongoose.Types.ObjectId,
            ref:user,
            required:true,
        },
        status:{
            type:String,
            enum:["ignored","interested","accepted","rejected"],
        }

    },
    {
        timestamps:true
    }
);
connectionRequestSchema.index({fromUserId:1, toUserId:1})
connectionRequestSchema.pre("save",function(next){
    const request=this;
    if(request.toUserId.equals(request.fromUserId)){
        throw new Error("Can't send connection request to same user");
    }
    next();
});

module.exports=mongoose.model("ConnectionRequestSchema",connectionRequestSchema);