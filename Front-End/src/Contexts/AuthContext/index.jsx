import React, { useEffect, useState } from "react"

import { auth } from "../../Firebase/firebase-config"
import { onAuthStateChanged } from "firebase/auth";

const AuthContext = React.createContext()

export function useAuth() {
  const context = React.useContext(AuthContext)
  if (!context) throw new Error("useAuth must be used within an AuthProvider")
  return context
}
export function AuthProvider ({children}) {
    const [currentUser , setCurrentuser] = useState(null);
    const [userLoggedIn , serUserloggedIn] = useState(false);
    const [firebaseUId , setFirebaseUId] = useState('')
    const [authChecked, setAuthChecked] = useState(false); // NEW



    const [Loading , setLoading] = useState(true);
     const [Name, setName] = useState(() => {
        
        return localStorage.getItem("name") || ''
    })

  
    
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth , initializeUser)
        if (Name) {
            localStorage.setItem("name", Name)
        }
        
        return unsubscribe

    }, [Name])

    async function initializeUser(user) {
        if(user) {
            setCurrentuser(user)
            serUserloggedIn(true)
         setFirebaseUId(user.uid); 
       
        }
        else { 
            setCurrentuser(null)
            serUserloggedIn(false)
        }
        setLoading(false)
    }   
    const value = {
        currentUser,
        userLoggedIn,
        Name,
        setName,
        firebaseUId,
        Loading
    }
    return  (
        <AuthContext.Provider value={value}>
            {!Loading && children}
        </AuthContext.Provider>
    )


} 


