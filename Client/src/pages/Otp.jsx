import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import  {userverify} from '../services/Apis';
import 'react-toastify/dist/ReactToastify.css';

function Otp() {
  const [otp, setOtp] = useState(""); 

  const location = useLocation();
  const navigate = useNavigate();

  const LoginUser=async(e)=>{
    if(otp===''){
      toast.error('Please fill all the fields');
    }else if(otp.length<6){
      toast.error('OTP Should be min six digit');}
      else{
        const data={email:location.state,phone:location.state,otp:otp};
        console.log(data)
        const response=await userverify(data);
        if(response.status===200){
          localStorage.setItem("token",response.data.userToken);
          toast.success(response.data.message);
          setTimeout(()=>{
            navigate("/dashboard");
          },3000)
          setOtp('');
        }
        else{
          toast.error(response.data.error);
          setOtp('');
        }
        
      }
  }

  

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h2 className="text-2xl font-semibold mb-4">Enter OTP</h2>
      <div className="flex space-x-2">
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="text-center border border-gray-300 rounded-md text-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
      </div>
      <button onClick={LoginUser} className="mt-4 px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 transition duration-300">
        Submit OTP
      </button>
      <ToastContainer />
    </div>
  );
}

export default Otp;

