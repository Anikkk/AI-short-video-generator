// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getStorage} from 'firebase/storage'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "ai-short-video-generator-6e60b.firebaseapp.com",
  projectId: "ai-short-video-generator-6e60b",
  storageBucket: "ai-short-video-generator-6e60b.firebasestorage.app",
  messagingSenderId: "859046904125",
  appId: "1:859046904125:web:ae5f1af7de582acee0c554",
  measurementId: "G-MZFE89W8JR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)