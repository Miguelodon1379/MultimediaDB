// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA66m8aTjHtyqbQsSyjWx30a4xkfQLGQNc",
  authDomain: "multilectum.firebaseapp.com",
  projectId: "multilectum",
  storageBucket: "multilectum.appspot.com",
  messagingSenderId: "409398208138",
  appId: "1:409398208138:web:4bb9c152ff38be108faf73",
  measurementId: "G-YW6TWFJJZX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export the database
export const db = getFirestore(app);
