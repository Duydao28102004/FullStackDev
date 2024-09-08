import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSession } from '../LoginData';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const Admin = () => {
  const { deleteUserData } = useSession();
  const [pendingGroups, setPendingGroups] = useState([]);
  const navigate = useNavigate();

  // Fetch pending group requests
  useEffect(() => {
    const fetchPendingGroups = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/admin/getPendingGroups');
        setPendingGroups(response.data);
      } catch (error) {
        console.error('Error fetching pending groups:', error);
      }
    };

    fetchPendingGroups();
  }, []);

  // Approve a group
  const handleAcceptGroup = async (groupId) => {
    try {
      await axios.post(`http://localhost:3001/api/admin/approveGroup`, {
        groupId
      });
      setPendingGroups(pendingGroups.filter(group => group._id !== groupId));
    } catch (error) {
      console.error('Error approving group:', error);
    }
  };

  // Decline a group
  const handleRejectGroup = async (groupId) => {
    try {
      await axios.post(`http://localhost:3001/api/admin/rejectGroup`, {
        groupId
      });
      setPendingGroups(pendingGroups.filter(group => group._id !== groupId));
    } catch (error) {
      console.error('Error rejecting group:', error);
    }
  };

  // Handle Logout
  const handleLogout = () => {
    deleteUserData();  // Clears the user session data
    navigate('/login');  // Redirects to the login page
  };

  return (
    <>
      <Navbar />
      <div className="admin-page p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Pending Group Approvals</h2>
          <button
            onClick={handleLogout}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Logout
          </button>
        </div>

        {pendingGroups.length === 0 ? (
          <p>No pending group approvals.</p>
        ) : (
          <div className="space-y-4">
            {pendingGroups.map((group) => (
              <div key={group._id} className="p-4 bg-white shadow rounded-lg">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-medium">{group.name}</h3>
                    <p className="text-sm text-gray-600">{group.description}</p>
                    <p className="text-sm text-gray-600">Visibility: {group.visibility}</p>
                  </div>
                  <div className="flex space-x-4">
                    <button
                      onClick={() => handleAcceptGroup(group._id)}
                      className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => handleRejectGroup(group._id)}
                      className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
                    >
                      Decline
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Admin;
