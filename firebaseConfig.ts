import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDuxOY68rZqNcoyod3gnQWx-pe4Cz-DwYg",
  authDomain: "propertyfinder-44a67.firebaseapp.com",
  databaseURL:
    "https://propertyfinder-44a67-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "propertyfinder-44a67",
  storageBucket: "propertyfinder-44a67.appspot.com",
  messagingSenderId: "810572333700",
  appId: "1:810572333700:web:6e3e1a51f83206e89e78d1",
  measurementId: "G-JH1GCFJMFM",
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIREBASE_DB = getFirestore(FIREBASE_APP);
