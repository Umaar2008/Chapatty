import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../Contexts/AuthContext';
import { getSafeBase64 } from '../Components/getSafeBase64';

function UserList({ onSelectUser }) {
  const [users, setUsers] = useState([]);
  const { firebaseUId } = useAuth();
  const [selectedUid, setSelectedUid] = useState(null); 

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("http://localhost:5000/User/Get");
        const filtered = res.data.filter(user => user.FirebaseUId !== firebaseUId);
        setUsers(filtered);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    if (firebaseUId) fetchUsers();
  }, [firebaseUId]);

  return (
    <div className="w-full">
      <h4 className="text-sm font-semibold text-gray-700 mb-2 text-center">Inbox</h4>
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
        ))}
      </div>
    </div>
  );
}

export default UserList;
