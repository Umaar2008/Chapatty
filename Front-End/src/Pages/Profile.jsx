import React, { useState , useEffect } from 'react';
import { useAuth } from '../Contexts/AuthContext';
import { doSignOut } from '../Firebase/auth';
import { useNavigate } from 'react-router-dom';
import UserList from '../Components/UserList';
import ChatWindow from '../Components/ChatWindow';
import { getSafeBase64 } from '../Components/getSafeBase64';
import axios from 'axios';

function Profile() {
  const { userLoggedIn, currentUser } = useAuth();  
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/User/GetUserbyid/${currentUser.uid}`);
        setMyProfile(res.data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };
  
    if (currentUser?.uid) fetchProfile();
  }, [currentUser]);
  const navigate = useNavigate();
  const [selectedUser, setSelectedUser] = useState(null);

  if (!currentUser) return <div>Loading profile...</div>;

  const handleLogout = async () => {
    await doSignOut();
    navigate('/');
  };
const [myProfile, setMyProfile] = useState(null);

  return (
    <div className="flex  h-screen relative">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-25 z-0"
        style={{
          backgroundImage: 'url("/istockphoto-1219641933-612x612.jpg")',
        }}
      ></div>

      {/* Main content */}
      <div className="relative z-10 flex w-full bg-white/60 backdrop-blur-sm">
        {/* Sidebar */}
        <div className="w-[260px] border-r border-gray-300 p-4 flex flex-col items-center">
          {/* Avatar Section */}
        <div className="w-20 h-20 rounded-full bg-gray-200 overflow-hidden mb-3">
  <img
    src={getSafeBase64(myProfile?.ProfilePic)}
    alt="Your Avatar"
    className="w-full h-full object-cover"
  />
</div>
          <p className="text-md font-semibold text-gray-800 text-center mb-1">
            {currentUser?.displayName || currentUser?.email}
          </p>
          <p className="text-xs text-gray-500 mb-4">My Profile</p>

          {/* User list */}
          <UserList currentUser={currentUser} onSelectUser={setSelectedUser} />
        </div>

        {/* Chat Window */}
        <div className="flex-1 p-4 overflow-hidden">
          {selectedUser ? (
            <ChatWindow currentUser={currentUser} otherUser={selectedUser} />
          ) : (
            <div className="h-full flex items-center justify-center text-gray-500 text-lg">
              Select a user to start chatting.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
