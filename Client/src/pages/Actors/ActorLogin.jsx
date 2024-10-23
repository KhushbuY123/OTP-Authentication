import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { actorverify } from '../../services/Apis';

function ActorLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');

  const actorlogin = async (e) => {
    e.preventDefault();

    if (email === '' || password === '' || role === '') {
      toast.error('Please fill all the fields');
      return;
    }

    try {
      const data = { email, password, role };
      console.log(data);
      // Make a request to your backend API for user verification
      const response = await actorverify(data);

      if (response.status === 200) {
        const {token,user}=response.data;
        // localStorage.setItem('actorToken', token);
        // localStorage.setItem('user', user);
        localStorage.setItem('userData', JSON.stringify(user));
        // console.log(user.role)
        // console.log(response.data)
        toast.success('Login successful');
        navigate("/actorDash", { state: email });
      } else {
        toast.error(response.data.error);
      }
    } catch (error) {
      toast.error(error.response?.data?.error || "Login failed");
    }
  };

  return (
    <div className="container shadow-lg m-auto text-center p-5 w-[700px] mt-8 bg-gray-100 rounded-md">
      <h3 className="text-2xl font-semibold mb-4">Welcome back, ActorLogin Here!</h3>
      <form onSubmit={actorlogin}>
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
        <div className='mb-3'>
           <label className="block text-left mb-2">Select Role</label>
            <select
              className="w-full p-2 border border-gray-300 rounded"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
                <option value="">Select Role</option>
                <option value="crm">CRM</option>
                <option value="sp">SP Admin</option>
                <option value="accountant">Accountant</option>
                <option value="manager">Manager</option>
            </select>
        </div>
        <button
          type="submit"
          className="bg-blue-950 text-white w-full p-2 rounded-md mt-4"
        >
          ActorLogin
        </button>
      </form>
      <ToastContainer />
    </div>
  );
}

export default ActorLogin;
