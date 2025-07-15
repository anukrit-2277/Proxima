import axios from 'axios';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { useNavigate } from 'react-router-dom';
const Login = () =>   {
  const [password,setPassword]=useState("Rohit@123");
  const [emailId,setEmailId]=useState("Rohit@gmail.com");
  const dispatch=useDispatch();
  const navigate=useNavigate();  
  const handleLogIn= async()=>{
    try{
    const result= await axios.post("http://localhost:1700/login",
      {emailId, password},{withCredentials:true} //to pass the token
    )
    //console.log(result);
    dispatch(addUser(result.data)); //action,payload
    return navigate("/feed")

  }
    catch(err){
      console.log(err.message);
    }
    
  }
  return (
    <div className="flex justify-center my-4">    
    <div className="card card-border bg-base-100 w-96  border-8">
    <div className="card-body ">
      <h2 className="card-title justify-center ">Login</h2>
      <fieldset className="fieldset">
      <legend className="fieldset-legend">Email ID</legend>
      <input type="text" value={emailId} className="input " placeholder="Email" onChange={(e)=>{setEmailId(e.target.value)}} />
      <legend className="fieldset-legend">Password</legend>
      <input type="text" value={password} className="input" placeholder="password"  onChange={(e)=>{setPassword(e.target.value)}} />
      </fieldset>
      <div className="card-actions justify-center">
        <button className="btn btn-primary" onClick={handleLogIn}>Sign in</button>
      </div>
    </div>
  </div>
  </div>
  )
}

export default Login