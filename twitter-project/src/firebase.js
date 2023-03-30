import firebase from "firebase";

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