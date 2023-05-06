/*
The program have referenced Rafeh Qazi's https://github.com/CleverProgrammers/twitter-clone with great modification

Documentation by ChatGPT (modified):

The firebase.js file contains the necessary code to connect to Firebase and initialize the Cloud Firestore service.

First, the firebase and firestore modules are imported. 
Then, the firebaseConfig object is defined, which contains the configuration settings for the Firebase project, including the API key, authentication domain, project ID, storage bucket, messaging sender ID, app ID, and measurement ID (which is optional for Firebase SDK v7.20.0 and later).

Next, the firebase.initializeApp() method is called with the firebaseConfig object as its argument to initialize the Firebase app.

Finally, the db constant is initialized with a reference to the Cloud Firestore service using the firebase.firestore() method, and is exported as the default export of the module.

This file can be imported into other modules to access the Cloud Firestore service and perform CRUD operations on the database.

*/


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

