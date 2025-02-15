// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAHqkxeazgNpibx4kKucOPbZZY4uuTKwMM",
    authDomain: "mfccsv.firebaseapp.com",
    projectId: "mfccsv",
    storageBucket: "mfccsv.firebasestorage.app",
    messagingSenderId: "440386002451",
    appId: "1:440386002451:web:a491d53897e065d877e9e6",
    measurementId: "G-PD7CHRJNKJ"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db};
