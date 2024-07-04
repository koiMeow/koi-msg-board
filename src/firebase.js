// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, onSnapshot } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCdDhDksrMoKmlygGukKNNagg2WyruQ8Xw",
  authDomain: "koi-msg-board-52338.firebaseapp.com",
  projectId: "koi-msg-board-52338",
  storageBucket: "koi-msg-board-52338.appspot.com",
  messagingSenderId: "576447717327",
  appId: "1:576447717327:web:7f90800d5764a0b13cbcba"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db, collection, addDoc, onSnapshot };