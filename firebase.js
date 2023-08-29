// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCkEenTPqKn3KeNcdnpT6vCHGzCHYVe2ug",
  authDomain: "fua-manguo.firebaseapp.com",
  projectId: "fua-manguo",
  storageBucket: "fua-manguo.appspot.com",
  messagingSenderId: "1078794290350",
  appId: "1:1078794290350:web:63f0bc0f945bdbc4c8d93f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
 const db = getFirestore()

export {auth,db}