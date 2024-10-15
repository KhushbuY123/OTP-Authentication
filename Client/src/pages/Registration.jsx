import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { registerfunction } from "../services/Apis";

function Registration() {
    const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
    phone:""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    if (inputs.name === "" || inputs.email === "" || inputs.password === "") {
      toast.error("Please fill all the fields");
    } else if (!inputs.email.includes("@") || !inputs.email.includes(".")) {
      toast.error("Invalid Email");
    }
    else if(inputs.password.length < 6) {
        toast.error("Password must be atleast 6 characters")
    } else {
      const response=await registerfunction(inputs);
      console.log(response)
      if(response.status==200){
        setInputs({...inputs,name:"",email:"",password:""});
        navigate("/");
      }
      else{
        toast.error("User already exists");
      }
    }
  }

  // Toggle the password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="container shadow-lg m-auto text-center p-5 w-[700px] mt-8 bg-gray-100 rounded-md">
      <h3 className="text-2xl font-semibold mb-4">Register Yourself Here!</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="block text-left mb-2">Name</label>
          <input
            type="text"
            onChange={handleChange}
            placeholder="Enter Your Name"
            className="w-full p-2 border border-gray-300 rounded"
            name="name"
          />
        </div>
        <div className="mb-3">
          <label className="block text-left mb-2">Phone</label>
          <input
            type="text"
            onChange={handleChange}
            placeholder="Enter Your Phone Number"
            className="w-full p-2 border border-gray-300 rounded"
            name="phone"
          />
        </div>
        <div className="mb-3">
          <label className="block text-left mb-2">Email</label>
          <input
            onChange={handleChange}
            type="text"
            placeholder="Enter Your Email"
            className="w-full p-2 border border-gray-300 rounded"
            name="email"
          />
        </div>
        <div className="mb-3 relative">
          <label className="block text-left mb-2">Password</label>
          <input
            onChange={handleChange}
            type={showPassword ? "text" : "password"}
            placeholder="Enter Your Password"
            className="w-full p-2 border border-gray-300 rounded"
            name="password"
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute inset-y-0 right-3 mt-6 text-blue-500 focus:outline-none"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>
        <button
          type="submit"
          className="bg-blue-950 text-white w-full p-2 rounded-md mt-4"
        >
          Register
        </button>
      </form>
      <ToastContainer />
    </div>
  );
}

export default Registration;
