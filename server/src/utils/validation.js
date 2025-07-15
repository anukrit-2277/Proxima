const validator=require("validator");
const { rawListeners } = require("../models/user");
const validateSignUpData=(req)=>{
   const {firstName,lastName,emailId,password}=req.body;

   if(!firstName.length || !lastName.length){
        throw new Error("name not valid")
   }
   else if(!validator.isEmail(emailId)){
        throw new Error("Email is not valid");
   }
   else if(!validator.isStrongPassword(password)){
        throw new Error("Enter strong password");
   }
}

const validateEditProfileData=(req)=>{
     const validInputFields=["firstName","lastName","age","gender","skills","photoURL","about"];
     const isValidFields= Object.keys(req.body).every((field)=>validInputFields.includes(field));
     return isValidFields;
}
module.exports={    
    validateSignUpData,validateEditProfileData
};