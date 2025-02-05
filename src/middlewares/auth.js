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