import React from 'react';
import { useAuth } from '../Contexts/AuthContext';
import { doSignOut } from '../Firebase/auth';
import Button from '../Components/Button';
import { useNavigate } from 'react-router-dom';

function Profile() {
  const { userLoggedIn } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    await doSignOut();         
    navigate('/');             
  };

  return (
    <div>
      <Button
        onClick={handleSubmit}
        className=""
        rounded
        warning
        hover
      >
        Logout
      </Button>
    </div>
  );
}

export default Profile;
