const mongoose=require("mongoose");
const validator=require("validator");
const jwt=require("jsonwebtoken");
const bcrypt=require("bcrypt");
require('dotenv').config()
const SECRET_JWT=process.env.SECRET_JWT
const userSchema= new mongoose.Schema({
        firstName:{
            type:String,
            required:true,
            minLength:3
            
        },
        lastName:{
            type:String,
        },
        emailId:{
            type:String,
            required:true,
            unique:true,
            lowercase:true,
            trim:true,
            validate(value){
                if(!validator.isEmail(value)){
                    throw new Error("invalid email addr"+value)
                }
            }
        },
        password:{
            type:String,
            required:true,
            validate(value){
                if(!validator.isStrongPassword(value)){
                    throw new Error("weak password");
                }
            }
        },
        age:{
            type:Number,
        },
        gender:{
            type:String,
            lowercase:true,
            validate(value){
                if(!["male","female","other"].includes(value)){
                    throw new Error ("Invalid Gender")
                }
            }
        },
        skills:{
            type:[],
        },
        photoURL:{
            type:String,
            default:'https://w7.pngwing.com/pngs/910/606/png-transparent-head-the-dummy-avatar-man-tie-jacket-user-thumbnail.png',
            validate(value){
                if(!validator.isURL(value)){
                    throw new Error ("Invalid URL");
                }
            }
        },
        about:{
            type:String,
            default:'Hi, this is my about'
        }
    },
{
    timestamps:true
}
);

userSchema.methods.getJWT=async function(){
    const token=await jwt.sign({_id:this._id},SECRET_JWT);
    return token;
}

userSchema.methods.validatePassword=async function(passwordInputByUser){
    const passwordHash=this.password;
     const isValidPassword=await bcrypt.compare(passwordInputByUser,passwordHash );

     return isValidPassword

}
module.exports=mongoose.model("User",userSchema);