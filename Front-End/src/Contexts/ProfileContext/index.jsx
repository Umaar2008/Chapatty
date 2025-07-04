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
     const [err , setErr] = useState({
      "username" : "Username is required",
      "usernameinvalid" : "Username is invalid",
      "Password" : "Password is required"
      ,
       "Passwordinvalid" : "Password is Invalid",
      "Name" : "Name is required"
      ,
      "Hobbies" : "Hobbies are required"
      ,
      "Gender" : "Gender is required",
      "Date" : "Date of birth is required",
      "Email" : "Email is required",
      "bio" : "Field is required to be filed",
      "ProfilePic" : "Profile Photo is required"
     })

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
        CreateUser ,
        err,
        setErr
     }

return  (
        <ProfileContext.Provider value={value}>
            { children}
        </ProfileContext.Provider>
    )

}
