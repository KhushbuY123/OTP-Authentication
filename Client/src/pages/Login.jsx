import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { sendOtpFunction } from '../services/Apis';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');

  const sendOtp = async(e) => {
    e.preventDefault();
    if (email === '' || password === '' || phone === '') {
      toast.error('Please fill all the fields');
    } else if (!email.includes('@') || !email.includes('.')) {
      toast.error('Invalid Email');
    } else {
      const data={email:email,password:password,phone:phone};
      const response=await sendOtpFunction(data);
      if(response.status===200){
        navigate("/otp", { state: email });
      }else{
        toast.error(response.data.message);
      }
    }
  };

  return (
    <div className="container shadow-lg m-auto text-center p-5 w-[700px] mt-8 bg-gray-100 rounded-md">
      <h3 className="text-2xl font-semibold mb-4">Welcome back, Login Here!</h3>
      <form onSubmit={sendOtp}>
        <div className="mb-3">
          <label className="block text-left mb-2">Email</label>
          <input
            type="text"
            placeholder="Enter Your Email"
            className="w-full p-2 border border-gray-300 rounded"
            value={email}
            name="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="block text-left mb-2">Phone</label>
          <input
            type="phone"
            placeholder="Enter Your Mobile Number"
            className="w-full p-2 border border-gray-300 rounded"
            value={phone}
            name="phone"
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="block text-left mb-2">Password</label>
          <input
            type="password"
            placeholder="Enter Your Password"
            className="w-full p-2 border border-gray-300 rounded"
            value={password}
            name="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="bg-blue-950 text-white w-full p-2 rounded-md mt-4"
        >
          Login
        </button>
        <p className="mt-4">
          Don't have an account?{' '}
          <NavLink to="/register" className="text-blue-500 underline">
            Register
          </NavLink>
        </p>
      </form>
      <ToastContainer />
    </div>
  );
}

export default Login;
