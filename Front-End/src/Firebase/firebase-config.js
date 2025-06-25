import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyB74qSEaePNaOvmHObS3MQK2GtAbxgXAYc",
  authDomain: "chapatty-2008.firebaseapp.com",
  projectId: "chapatty-2008",
  storageBucket: "chapatty-2008.firebasestorage.app",
  messagingSenderId: "437474229414",
  appId: "1:437474229414:web:74cf36bb7fe060e1804867",
  measurementId: "G-S18W0HCJVL"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const analytics = getAnalytics(app);

export { auth, app };
