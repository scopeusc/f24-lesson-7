// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE,
  authDomain: "blog-ba98a.firebaseapp.com",
  projectId: "blog-ba98a",
  storageBucket: "blog-ba98a.appspot.com",
  messagingSenderId: "291488157807",
  appId: "1:291488157807:web:eb12e4dff76132134c3d9a"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

