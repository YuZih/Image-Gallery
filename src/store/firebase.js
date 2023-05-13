// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDG0a-piEqyZK94Ym8K3Gwyh9wb3kL67bQ",
  authDomain: "vue-galley-yuzuxpic.firebaseapp.com",
  projectId: "vue-galley-yuzuxpic",
  storageBucket: "vue-galley-yuzuxpic.appspot.com",
  messagingSenderId: "14812577310",
  appId: "1:14812577310:web:7082ce97bfc115eef2b80f"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Database
const db = getFirestore(app);
export { db };