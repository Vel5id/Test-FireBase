// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC0zcUS6WAOPneTCc1BVb_FiptziVp9XNI",
  authDomain: "test15-dc4e0.firebaseapp.com",
  projectId: "test15-dc4e0",
  storageBucket: "test15-dc4e0.appspot.com",
  messagingSenderId: "718069047905",
  appId: "1:718069047905:web:a115dfa8f8735a91b04020",
  measurementId: "G-Z1V38ZLN79"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };