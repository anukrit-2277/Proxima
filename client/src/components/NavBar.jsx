import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios';
import { removeUser } from '../utils/userSlice';

const NavBar = () => {
  const userInfo=useSelector((store)=>store.user);
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const handleIcon=()=>{
     navigate("/login");
    
  }
  const handleLogOut=async ()=>{
    try{
      const result= await axios.post ("http://localhost:1700/logout",{},{withCredentials:true})
      console.log(result?.data?.message); 
      dispatch(removeUser());
      navigate("/login")


    }
    catch(err){
      console.log(err.message)
    }

  }
 // const [userName,setUserName]=useState(""); 
  //console.log(userInfo.data.firstName);
  return (
    <div className="navbar bg-base-300 shadow-sm">
  <div className="flex-1">
    <a className="btn btn-ghost text-xl" onClick={handleIcon}>DevTinder</a>
  </div>
  <div className="flex gap-2 mx-2">
  <p> {userInfo?.data?.firstName ? `Welcome, ${userInfo?.data?.firstName}`:null}</p>
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img
            alt="Tailwind CSS Navbar component"
            src={userInfo?.data?.photoURL?userInfo?.data?.photoURL:"https://w7.pngwing.com/pngs/910/606/png-transparent-head-the-dummy-avatar-man-tie-jacket-user-thumbnail.png"} />
        </div>
      </div>
      <ul
        tabIndex={0}
        className=" menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-22 p-2 shadow ">
        <li>
          <a className="justify-between">
            Profile
         
          </a>
        </li>
        <li><a>Settings</a></li>
        <li><a onClick={handleLogOut}>Logout</a></li>
      </ul>
    </div>
  </div>
</div>
  )
}

export default NavBar