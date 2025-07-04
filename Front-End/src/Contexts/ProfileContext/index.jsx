import React from "react";
import { useState } from "react";
import { useAuth } from "../AuthContext";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
    
const ProfileContext = React.createContext()
export function useProfile() {
    return React.useContext(ProfileContext)
}



export function ProfileMaking ({children}) {
const {   firebaseUId } = useAuth();

    const [file , setFile ] = useState() 
     const [date, setDate] = useState(null);
     const [gender, setGender] = useState(null);
     const [bio , setBio ] = useState("")  
     const [username , setUserName] = useState("")
     const [hobbies , setHobbies] = useState("");

        const CreateUser = async (firebaseUId, username, file, bio, hobbies, date, gender) => {
  try {
    const formData = new FormData();
    formData.append("FirebaseUId", firebaseUId);
    formData.append("UserName", username);
    formData.append("ProfilePic", file);
    formData.append("Bio", bio);
    formData.append("Hobbies", hobbies);
    formData.append("DOB", date);
    formData.append("Gender", gender);

    const response = await axios.post("http://localhost:5000/User/Create", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    console.log("User created:", response.data);
    return response.data;
  } catch (error) {
    console.error("CreateUser error:", error.response?.data || error.message);
    throw error;
  }
};



     const value = {
        file ,
        setFile ,
        date ,
        setDate, 
        gender ,
        setGender,
        bio ,
        setBio ,
        username ,
        setUserName,
        hobbies ,
        setHobbies,
        CreateUser
     }

return  (
        <ProfileContext.Provider value={value}>
            { children}
        </ProfileContext.Provider>
    )

}
