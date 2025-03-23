/*

const adminAuth=(req,res,next)=>{
    console.log("checking if admin is authorized");
    const token="xyz";
    const isAdminAuthorised=token==="xyz";
    if(!isAdminAuthorised){
        res.status(401).send("admin not authorized");
    }
    else{
        next();
    }
};

const userAuth=(req,res,next)=>{
    console.log("checking if user is authorized");
    const token="xyz";
    const isuserAuthorised=token==="xyz";
    if(!isuserAuthorised){
        res.status(401).send("user not authorized");
    }
    else{
        next();
    }
};

module.exports = {adminAuth,userAuth};
*/

const jwt=require("jsonwebtoken")
const User=require("../models/user")
const userAuth=async (req,res,next)=>{
    try{
    const {token}=req.cookies;
    if(!token){
        throw new Error("Invalid token!!")
    }
    const {_id}=await jwt.verify(token,"DevTinder@2277");
    const user= await User.findById(_id);
    if(!user){
        throw new Error ("No user found");
    }
    //res.send(user);
    req.user=user;
    next();
    }
    catch(err){
        res.status(400).send("error "+err.message);
    }
}
module.exports={userAuth};