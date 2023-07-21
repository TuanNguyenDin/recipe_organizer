// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCpO3yxuQoF2VX0V7be7RbTBbWO0FnGVPg",
  authDomain: "recipeorganizer-ad961.firebaseapp.com",
  projectId: "recipeorganizer-ad961",
  storageBucket: "recipeorganizer-ad961.appspot.com",
  messagingSenderId: "603365477868",
  appId: "1:603365477868:web:8a3f52e8f54728b86d44c9",
  measurementId: "G-XDPPZ3L0WY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

export {app, auth};