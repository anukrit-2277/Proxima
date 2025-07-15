import axios from 'axios';
import React, { useEffect, useState } from 'react'
import FeedCard from './feedCard';

const Feed = () => {
  const [usersData,setUsersData]=useState(null);

  const fetchUsers=async()=>{
    try{
    const usersData= await axios.get("http://localhost:1700/user/feed",{withCredentials:true})
     setUsersData(usersData?.data?.data);
     }
     catch(err){
      console.log(err.message)
     }
   }; 
  useEffect(()=>{
    const fetchUsersData= async()=>{
      await fetchUsers();
    }
    fetchUsersData();
  },[]);
  /*
  //const name=usersData?.[0].firstName;
  //console.log(Object?.values(usersData));
  //first name,last name,skills,photoURL,about  
 //const name=usersData?.data[0]?.firstName;
 //console.log(name);
 // const res= usersData.map((x)=>{x.map(x.firstName)})
 // console.log(res)
// usersData?( res=usersData.map((user,index)=>(user.firstName))):"not fetched";

  //usersData?console.log(typeof(usersData?.[0])):console.log("not fetched");
  */
  return (
    <>
   {
    //Object.values(usersData).map((user, index) => (
  //<FeedCard key={index} {...user} />))
  usersData?usersData.map((user,index)=>(<FeedCard {...user} key={index} />)):"rendering data"
  } 
  <h1>feed</h1>

    </>
  )
}

export default Feed