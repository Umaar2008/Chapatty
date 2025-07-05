import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../Contexts/AuthContext';
import { getSafeBase64 } from '../Components/getSafeBase64';
import { DotLoader	 } from "react-spinners";
import {ColorRing} from "react-loader-spinner"

function UserList({ onSelectUser }) {
  const [users, setUsers] = useState([]);
  const { firebaseUId } = useAuth();
  const [selectedUid, setSelectedUid] = useState(null);
  const [loading, setloading] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {


      setloading(true);
      try {
        const res = await axios.get(`${import.meta.env.VITE_REACT_APP_Get_Users}`);
        const filtered = res.data.filter(user => user.FirebaseUId !== firebaseUId);
        setUsers(filtered);
        setloading(false);
      } catch (error) {
    throw new error(error.message);
      }
    };

    if (firebaseUId) fetchUsers();
  }, [firebaseUId]);

  return (
    <div className="w-full">
      {loading ? (
        <div className="min-h-screen flex mt-50 justify-center text-black">
        
          <ColorRing 
           height="80"
width="80"
visible={true}
ariaLabel="color-ring-loading"
wrapperStyle={{}}
wrapperClass="color-ring-wrapper"
colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
          
          />
        </div>
      ) : (
        <>
          <h4 className="text-sm font-semibold text-gray-700 mb-2 text-center">Inbox</h4>
        <div>
          <div
  onClick={() => {
    onSelectUser({
      FirebaseUId: "gemini_ai_bot", 
      UserName: "Gemini AI",

      isAI: true                    
      
    });
    setSelectedUid("gemini_ai_bot");
  }}
 
>

  
</div>

        </div>
          <div className="space-y-2 overflow-y-auto max-h-[calc(100vh-200px)]">
            {users.map((user, index) => ( 
              <div
                key={user.Uid || index}
                onClick={() => {
                  onSelectUser(user);
                  setSelectedUid(user.FirebaseUId);
                }}
                className={`cursor-pointer flex items-center gap-3 px-1 py-2 rounded-md transition hover:bg-gray-200 ${
                  selectedUid === user.FirebaseUId ? 'bg-gray-300' : ''
                }`}
              >
                <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-300 shrink-0">
                  <img
                    src={getSafeBase64(user.ProfilePic)}
                    alt="avatar"
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-gray-800">{user.UserName || 'Unnamed User'}</p>
              </div>
            )).reverse()}
          </div>
        </>
      )}
    </div>
  );
}

export default UserList;
