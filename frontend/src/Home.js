/*
The program have referenced Rafeh Qazi's https://github.com/CleverProgrammers/twitter-clone with great modification

Documentation by ChatGPT (modified):

The Home.js file is a React component that represents the home page of the application. 
It imports several dependencies, including useNavigate and Link from react-router-dom, Feed and Widgets components, SideBarContainer component, firebase and useEffect and useState hooks from React.

The component defines several state variables, including uid, userData, and isAdmin. It also defines a navigate variable using the useNavigate hook.

The fetchUserData function is an asynchronous function that fetches user data from the Firebase database using the uid state variable. 
If the user data is found, it is set to the userData state variable. Otherwise, an error message is logged to the console.

The checkAdmin function is an asynchronous function that checks if the user has an admin role in the Firebase database. If the user has an admin role, the isAdmin state variable is set to true.

The component defines two useEffect hooks. The first useEffect hook fetches the uid of the current user using the firebase.auth().onAuthStateChanged method. 
If the user is authenticated, the uid is set to the uid state variable. 
If the user is not authenticated, the user is redirected to the login page using the navigate variable.

The second useEffect hook calls the fetchUserData and checkAdmin functions.

The return statement of the component renders the SideBarContainer, Feed, and Widgets components based on the isAdmin state variable. 
If the user is not an admin, the app class is applied to the container div. If the user is an admin, the admin class is applied to the container div. 
If the uid state variable is null, nothing is rendered.

*/

import { useNavigate, Link } from "react-router-dom";
import Feed from "./Feed";
import Widgets from "./Widgets";
import "./App.css";
import SideBarContainer from "./sidebar/SideBarContainer";
import firebase from "firebase/app";
import { useEffect, useState } from "react";
import db from "./firebase";

function Home() {
  const [uid, setUid] = useState(null);
  const [userData, setUserData] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  let navigate = useNavigate();

  const fetchUserData = async () => {
    try {
      const docRef = db.collection("users").doc(uid);
      const docSnapshot = await docRef.get();
      if (!docSnapshot.empty) {
        const userData = docSnapshot.data();
        setUserData(userData);
      } else {
        console.log("User not found");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const checkAdmin = async () => {
    let role = "";
    try {
      const userSnapshot = await db
        .collection("users")
        .doc(uid)
        .get()
        .then((doc) => {
          console.log((role = doc.data().role));
        });
      if (role === "admin") {
        setIsAdmin(true);
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  useEffect(() => {
    fetchUserData();
    checkAdmin();
  });

  //get uid function
  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUid(user.uid);
      } else {
        setUid(null);
        navigate("/");
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <>
      {!isAdmin ? (
        <>
          {uid ? (
            <div className="app">
              <SideBarContainer uid={uid} />
              <Feed uid={uid} />
              <Widgets uid={uid} />
            </div>
          ) : (
            <div>{/* Nothing to show  */}</div>
          )}
        </>
      ) : (
        <>
          {uid ? (
            <div className="admin">
              <SideBarContainer uid={uid} />
              <Feed uid={uid} />
              <Widgets uid={uid} />
            </div>
          ) : (
            <div>{/* Nothing to show  */}</div>
          )}
        </>
      )}
    </>
  );
}

export default Home;
