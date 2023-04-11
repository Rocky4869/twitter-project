import { useNavigate, Link } from "react-router-dom";
import Feed from "./Feed";
import Widgets from "./Widgets";
import "./App.css";
import SideBarContainer from "./sidebar/SideBarContainer";
import Sidebar from "./sidebar/Sidebar";
import Setting from "./Setting";
import Profile from "./Profile";
import firebase from "firebase/app";
import { useEffect, useState } from "react";

function Home() {
  const [uid, setUid] = useState(null);

  //get uid function
  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUid(user.uid);
      } else {
        setUid(null);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div className="app">
      
      <SideBarContainer />
      <Feed />
      <Widgets />
    </div>
  );
}

export default Home;
