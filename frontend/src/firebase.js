import firebase from "firebase";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { getStorage } from "firebase/storage";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAz1txquIImyCCxP475H0dEW7G8wEpeRiE",
    authDomain: "twitter-project-b76cb.firebaseapp.com",
    projectId: "twitter-project-b76cb",
    storageBucket: "twitter-project-b76cb.appspot.com",
    messagingSenderId: "605871213249",
    appId: "1:605871213249:web:2073c2ed53ee7086736240",
    measurementId: "G-G8K816BN21"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();

export default db;
// for getting the uploaded image
export const storage = getStorage();


{/*
// Use this to initialize the firebase App
const firebaseApp = firebase.initializeApp(firebaseConfig);

// Use these for db & auth
const db = firebaseApp.firestore();
const auth = firebase.auth();

export default { auth, db };
*/}

