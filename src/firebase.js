// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA_rXKXZOmyRVgEJHl_OpYpgyF_t7PEyQU",
  authDomain: "cedarrapidsstemcircle.firebaseapp.com",
  projectId: "cedarrapidsstemcircle",
  storageBucket: "cedarrapidsstemcircle.firebasestorage.app",
  messagingSenderId: "556920297648",
  appId: "1:556920297648:web:5fc3379a14b9cc34ba8375",
  measurementId: "G-Q1PBTXPGXR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);