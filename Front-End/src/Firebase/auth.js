import {auth} from './firebase-config'
import { Link , Navigate } from 'react-router-dom'

import { createUserWithEmailAndPassword , signInWithEmailAndPassword , GoogleAuthProvider, FacebookAuthProvider , GithubAuthProvider } from 'firebase/auth'
import { signInWithPopup } from 'firebase/auth'

export const doCreatewithEmailAndPassword = async (email, password) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  return {
    user: userCredential.user,
    isNewUser: true // 
  };
};
export const doSigninwithEmailAndPassword = async (email , password) => {
    return await signInWithEmailAndPassword(auth , email , password)
   
}

export const doSignInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider)

const isNewUser = result._tokenResponse?.isNewUser || result.additionalUserInfo?.isNewUser;
   const displayName = result.user.displayName; 

  return {
    user: result.user,
        displayName,
    isNewUser
  };
}

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


