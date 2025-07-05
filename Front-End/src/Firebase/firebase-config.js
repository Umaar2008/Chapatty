import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"; 

const firebaseConfig = {
  apiKey: `${import.meta.env.VITE_REACT_APP_FIREBASE_API_KEY}`,
  authDomain: "chapatty-2008.firebaseapp.com",
  projectId: "chapatty-2008",
  storageBucket: "chapatty-2008.firebasestorage.app",
  messagingSenderId: "437474229414",
  appId: `${import.meta.env.VITE_REACT_APP_FIREBASE_API_ID}`,
  measurementId: "G-S18W0HCJVL"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const analytics = getAnalytics(app);
 const db = getFirestore(app);
export { auth, app , db };
