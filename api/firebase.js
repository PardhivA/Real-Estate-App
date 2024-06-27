// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// console.log(import.meta.env.FIREBASE_API_KEY);
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-sojoyrn.firebaseapp.com",
  projectId: "mern-sojoyrn",
  storageBucket: "mern-sojoyrn.appspot.com",
  messagingSenderId: "272157449786",
  appId: "1:272157449786:web:fe6743b13b81ba20995f03"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);