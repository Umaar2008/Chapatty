import React, { useState, useEffect } from 'react';
import { useAuth } from '../Contexts/AuthContext';
import { doSignOut , deleteAcc } from '../Firebase/auth';
import { useNavigate } from 'react-router-dom';
import UserList from '../Components/UserList';
import ChatWindow from '../Components/ChatWindow';
import { getSafeBase64 } from '../Components/getSafeBase64';
import axios from 'axios';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuTrigger,
} from "../components/Drop-menu";
import { GoogleGenAI } from "@google/genai";

function Profile() {
  const { userLoggedIn, currentUser } = useAuth();
  const [myProfile, setMyProfile] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  
  const navigate = useNavigate();
    
  
  
  useEffect(() => {
    if(!userLoggedIn) {
      navigate('/')
    }
    
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_REACT_APP_GET_CURRENT_USER}${currentUser.uid}`);
        setMyProfile(res.data);
      } catch (error) {
    throw new error(error.message);
      }
    };
    if (currentUser?.uid) fetchProfile();
  }, [currentUser]);

  const handleLogout = async () => {
    await doSignOut();
    navigate('/');
  };

  const handleDeleteAcc =  async () => {
    
      try {
        const res = await axios.delete(`${import.meta.env.VITE_REACT_APP_GET_CURRENT_USER_TO_DELETE}${currentUser.uid}`);
        setShowModal(false);
        deleteAcc(currentUser)
        handleLogout();
        
      } catch (error) {
    throw new error(error.message);

      }
    
  
  };
  if (!currentUser) return <div>Loading profile...</div>;

  return (
    <div className="flex h-screen relative">
      
      <div
        className="absolute inset-0 bg-cover bg-center opacity-25 z-0"
        style={{ backgroundImage: 'url("/istockphoto-1219641933-612x612.jpg")' }}
      ></div>

      
      <div className="relative z-10 flex w-full bg-white/60 backdrop-blur-sm">
        <div className="w-[260px] border-r border-gray-300 p-4 flex flex-col items-center">
         
          <div className="w-20 h-20 mb-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="w-20 h-20 rounded-full overflow-hidden border-4 border-transparent hover:border-black hover:shadow-lg transition duration-200 ease-in-out cursor-pointer">
                  <img
                    src={getSafeBase64(myProfile?.ProfilePic)}
                    alt="Your Avatar"
                    className="w-full h-full object-cover"
                  />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="start">
                <DropdownMenuGroup>
                  <DropdownMenuItem
                    onClick={() => navigate(`/UserProfile/${currentUser.uid}`)}
                    className="cursor-pointer"
                  >
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="cursor-pointer text-amber-500"
                  >
                    Sign Out
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => setShowModal(true)}
                    className="cursor-pointer text-red-600"
                  >
                    Delete Account
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuGroup>
                  <DropdownMenuSub>
                    <DropdownMenuPortal>
                      <DropdownMenuSubContent />
                    </DropdownMenuPortal>
                  </DropdownMenuSub>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

         
          <p className="text-md font-semibold text-gray-800 text-center mb-1">
            {myProfile?.UserName || currentUser?.email}
          </p>

         
          <UserList currentUser={currentUser} onSelectUser={setSelectedUser} />
        </div>

       
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

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full text-center">
            <h2 className="text-lg font-bold mb-4">Confirm Delete</h2>
            <p className="mb-6 text-gray-600">Are you sure you want to delete your account?</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-200 cursor-pointer text-gray-800 rounded hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteAcc}
                className="px-4 py-2 bg-red-600 cursor-pointer text-white rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;
