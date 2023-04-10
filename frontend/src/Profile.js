import { useParams } from "react-router-dom";
import Sidebar from "./sidebar/Sidebar";
import Feed from "./Feed";
import Widgets from "./Widgets";
import "./App.css";
import { useEffect, useState } from "react";
import db from "./firebase";

function Profile() {
  let { userid } = useParams();
  const [userData, setUserData] = useState(null);

  const fetchUserData = async () => {
    const collectionRef = db.collection("users");
    try {
      const querySnapshot = await collectionRef.where("id", ">=", userid).get();
      if (!querySnapshot.empty) {
        const doc = querySnapshot.docs[0];
        setUserData(doc.data());
      } else {
        console.log("User not found");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <div>
      {userData ? (
        <div className="app">
          {/* <div>Profile of {userid}</div> */}
          <Sidebar />
          {/* <Feed />
           */}
          <div>Profile of {userid}</div>
          <Widgets />
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default Profile;
