// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDUDPeOANRTnrfDi5TSULtfRNe-vyW877M",
  authDomain: "todo-app-4d58a.firebaseapp.com",
  projectId: "todo-app-4d58a",
  storageBucket: "todo-app-4d58a.appspot.com",
  messagingSenderId: "291319502958",
  appId: "1:291319502958:web:28c4769cf838fb64bbee7f",
  measurementId: "G-178GT43QHH",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);

export {
  app,
  db,
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  auth,
  signInWithEmailAndPassword,
  signOut,
};
