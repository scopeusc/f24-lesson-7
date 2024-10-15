// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE,
  authDomain: "test-curriculum.firebaseapp.com",
  projectId: "test-curriculum",
  storageBucket: "test-curriculum.appspot.com",
  messagingSenderId: "1066801845016",
  appId: "1:1066801845016:web:5c7412559a3ea2eac8c46d",
  measurementId: "G-WTW81HDD2T",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
