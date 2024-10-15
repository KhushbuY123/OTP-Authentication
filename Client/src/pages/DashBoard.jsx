import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
function DashBoard() {
  const navigate = useNavigate();

  const userValid=()=>{
    let token=localStorage.getItem('token');
    if(token){
      console.log("User is valid");
    }else{
      navigate("*");
    }
  }

  useEffect(()=>{
    userValid();
  },[])
  return (
    <div>
      <p>Dashboard</p>
    </div>
  )
}

export default DashBoard
