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
