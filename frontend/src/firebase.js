/*

Documentation by ChatGPT (modified):

The firebase.js file is used to connect to the Firebase Realtime Database and Cloud Firestore. 
It imports the firebase module and initializes it with the firebaseConfig object, which contains the API key, authentication domain, project ID, storage bucket, messaging sender ID, app ID, and measurement ID.

The file also initializes the Cloud Firestore service and exports it as a default module. 
This allows other files in the project to import the database instance and use it to read and write data to the database.

To use this file in your project, you will need to create a Firebase project and obtain the necessary credentials. 
You can then copy and paste the firebaseConfig object into your own firebase.js file and import the database instance into your other project files.
*/


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

