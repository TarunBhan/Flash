// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCMfjUpyIckXQG4WFX1xpIFuEI5z9wgSs4",
  authDomain: "login-auth-5b9a1.firebaseapp.com",
  projectId: "login-auth-5b9a1",
  storageBucket: "login-auth-5b9a1.appspot.com",
  messagingSenderId: "382339698580",
  appId: "1:382339698580:web:d1dd58a17672a1863ac981",
  measurementId: "G-BY4458NGEH",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth();

export default app;
