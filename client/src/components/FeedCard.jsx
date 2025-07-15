import React from 'react'

const FeedCard = ({firstName,lastName,age,skills,photoURL,about}) => {
   // console.log(about);
   const handleClick=()=>{

   }
  return (
    <div className="flex justify-center ">
    <div className="card bg-base-100  shadow-sm   ">
  <figure>
    <img className="w-80"
      src={photoURL}
      alt="user-pic" />
  </figure>
  <div className="card-body  ">
    <h2 className="card-title text-center text-2xl">{firstName+" "+ lastName +" " } {age?age:" "}</h2>
    <p>{about}</p>
   
    <div className="card-actions justify-center space-x-2.5">
      <button className="btn btn-primary" onClick={handleClick}>dislike</button>
      <button className="btn btn-primary" onClick={handleClick}>like</button>
      
    </div>
  </div>
</div>
    </div>
  )
}

export default FeedCard