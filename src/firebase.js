
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyALj8EGDjdQK1Y3NkiGlzs1KKNqg2W_590",
  authDomain: "bookmyshowclone-69edb.firebaseapp.com",
  projectId: "bookmyshowclone-69edb",
  storageBucket: "bookmyshowclone-69edb.appspot.com",
  messagingSenderId: "785157476119",
  appId: "1:785157476119:web:371ff01d9159fb335fb152",
  measurementId: "G-7P6HV6BYN3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
 
const auth=getAuth();
export {app,auth}
