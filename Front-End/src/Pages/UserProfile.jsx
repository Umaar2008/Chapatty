import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { ColorRing } from 'react-loader-spinner';
import { useAuth } from '../Contexts/AuthContext';
function UserProfile() {
  const {userLoggedIn} = useAuth();
  const [userProfile, setUserProfile] = useState(null);
  const { id } = useParams();
 const navigate = useNavigate()
  useEffect(() => {
    
        if (!userLoggedIn) {
          navigate('/')
        }
    const fetchUserProfile = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/User/GetUserbyid/${id}`);
        setUserProfile(res.data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    if (id) fetchUserProfile();
  }, [id]);

  const formatDOB = (dob) => {
    const date = new Date(dob);
    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    }); 
  };

  if (!userProfile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black to-zinc-900 text-white">
               <ColorRing 
                   height="80"
          width="80"
        visible={true}
          ariaLabel="color-ring-loading"
          wrapperStyle={{}}
          wrapperClass="color-ring-wrapper"
          colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
                  
                  /> <p className="ml-4 text-4xl text-gray-600">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black to-zinc-900 px-4 py-10">
      <div className="w-full max-w-2xl bg-zinc-800/30 backdrop-blur-lg rounded-2xl p-8 border border-zinc-700 shadow-xl">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          <img
            src={`data:image/png;base64,${userProfile.ProfilePic}`}
            alt="Profile"
            className="w-32 h-32 md:w-52 md:h-40 rounded-full object-cover border-4 border-green-400 shadow-green-500 shadow-md"
          />

          <div className="text-center md:text-left w-full space-y-2">
            <h1 className="text-3xl font-extrabold text-green-400 tracking-wider">
              {userProfile.UserName}
            </h1>
            <p className="text-zinc-300  text-sm md:text-base">
            <span className='text-zinc-400 font-medium'>About:</span> {userProfile.Bio || "No bio provided."}
            </p>

            <div className="mt-4 space-y-2 text-sm md:text-base text-zinc-200">
              <div className="flex justify-between md:justify-start md:gap-4">
                <span className="text-zinc-400 font-medium">Gender:</span>
                <span>{userProfile.Gender}</span>
              </div>
              <div className="flex justify-between md:justify-start md:gap-4">
                <span className="text-zinc-400 font-medium">Date of Birth:</span>
                <span>{formatDOB(userProfile.DOB)}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <button className="px-6 py-2 cursor-pointer bg-green-500 hover:bg-green-600 text-black text-sm font-semibold rounded-full transition shadow-md hover:shadow-green-400/50"
          onClick={() => {navigate('/Inbox')}}
          
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
