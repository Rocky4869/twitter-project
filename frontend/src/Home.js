import { useNavigate, Link } from "react-router-dom";
import Feed from "./Feed";
import Widgets from "./Widgets";
import "./App.css";
import SideBarContainer from "./sidebar/SideBarContainer";
import firebase from "firebase/app";
import { useEffect, useState } from "react";

function Home() {
  const [uid, setUid] = useState(null);

  let navigate = useNavigate();
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
      {uid ? (
        <div className="app">
          <SideBarContainer uid={uid}uid={uid} />
          <Feed uid={uid} />
          <Widgets />
        </div>
      ) : (
        <div>{/* Nothing to show  */}</div>
      )}
    </>
  );
}

export default Home;
