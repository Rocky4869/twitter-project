//import firebase from "firebase";
import firebase from "firebase/app";
import "firebase/firestore";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCrGlwtb8Z8SQOutojeJGFG63no8KiJEMA",
  authDomain: "simplified-twitter.firebaseapp.com",
  projectId: "simplified-twitter",
  storageBucket: "simplified-twitter.appspot.com",
  messagingSenderId: "152222455548",
  appId: "1:152222455548:web:6c4a78c8d2681adc68e979",
  measurementId: "G-MFR5ZGDEFQ",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = firebase.firestore();
export default db;

