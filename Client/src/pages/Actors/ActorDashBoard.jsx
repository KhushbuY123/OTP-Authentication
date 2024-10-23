import React, { useEffect, useState } from "react";
import { getallusers } from "../../services/Apis";

function ActorDashBoard() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getallusers();
        console.log(response);
        if (response.status === 200) {
          setUsers(response.data.userExist);
          setLoading(false);
        } else {
          setError(response.data.error);
          setLoading(false);
        }
      } catch (error) {
        setError(error.response?.data?.error || "Failed to fetch users");
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const user=JSON.parse(localStorage.getItem('userData'));
  const userRole=user?.role;
  let filteredClient=users;
  if (userRole!="crm"){
    if (userRole=="sp"){
       filteredClient=users.filter((user)=>user.assign!="crm");   
    }else if (userRole=="accountant"){
        filteredClient=users.filter((user)=>user.assign!="sp" && user.assign!="crm");
    }else if (userRole=="manager"){
        filteredClient=users.filter((user)=>user.assign!="accountant" && user.assign!="sp" && user.assign!="crm");    
    }
   
  }

  const handlelogout = () => {
    localStorage.removeItem('userData');
    window.location.href = '/actorLogin';
  }
  

  console.log(user)

  return (
    <>
      <button onClick={handlelogout} className="bg-blue-500 text-white p-2 m-3 rounded-md">Logout</button>
      <div className="container m-auto">
        <h3 className="text-2xl font-semibold mb-4 text-center p-8">Client List</h3>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error}</p>
        ) : filteredClient.length > 0 ? (
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Name</th>
                <th className="py-2 px-4 border-b">Email</th>
                <th className="py-2 px-4 border-b">Phone</th>
                <th className="py-2 px-4 border-b">Assign</th>
              </tr>
            </thead>
            <tbody>
              {filteredClient.map((user, index) => (
                <tr key={index} className="text-center">
                  <td className="py-2 px-4 border-b">{user.name}</td>
                  <td className="py-2 px-4 border-b">{user.email}</td>
                  <td className="py-2 px-4 border-b">{user.phone}</td>
                  <td className="py-2 px-4 border-b">{user.assign}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No users found.</p>
        )}
      </div>
    </>
  );
}

export default ActorDashBoard;
