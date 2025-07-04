import {auth} from './firebase-config'
import { Link , Navigate, useNavigate } from 'react-router-dom'

import { createUserWithEmailAndPassword , getAdditionalUserInfo, signInWithEmailAndPassword , GoogleAuthProvider, FacebookAuthProvider , GithubAuthProvider, deleteUser  } from 'firebase/auth'
import { signInWithPopup } from 'firebase/auth'

export const doCreatewithEmailAndPassword = async (email, password) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  return {
    user: userCredential.user,
    isNewUser: true 
  };
};
export const doSigninwithEmailAndPassword = async (email , password) => {
    return await signInWithEmailAndPassword(auth , email , password)
   
}



export const deleteAcc = async (user) => {
  try {
        await deleteUser(user);
        console.log("User account deleted successfully.");
    } catch (error) {
        console.error("Error deleting user account:", error);
    }
}
export const doSignInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  const result = await signInWithPopup(auth, provider);

  const user = result.user;
  const displayName = user.displayName;
  const additionalInfo = getAdditionalUserInfo(result);
  const isNewUser = additionalInfo?.isNewUser;

  return {
    user,
    displayName,
    isNewUser
  };
};

export const doSignInWithFacebook = async () => {
    const provider = new FacebookAuthProvider();
    const result = await signInWithPopup(auth, provider)
const isNewUser = result._tokenResponse?.isNewUser || result.additionalUserInfo?.isNewUser;
   const displayName = result.user.displayName; 

  return {
    user: result.user,
        displayName,
    isNewUser
  };
}

export const doSignInWithGithub = async () => {
    const provider = new GithubAuthProvider();
    const result = await signInWithPopup(auth, provider)
    
const isNewUser = result._tokenResponse?.isNewUser || result.additionalUserInfo?.isNewUser;
    const displayName = result.user.displayName; 

  return {
    user: result.user,
        displayName,
    isNewUser
  };
}

export const doSignOut = async () => {
    await auth.signOut();
    localStorage.removeItem("name");
    return
    
}


