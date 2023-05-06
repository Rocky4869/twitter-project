import { useParams, useNavigate } from "react-router-dom";
import Widgets from "./Widgets";
import "./App.css";
import { useEffect, useState } from "react";
import db from "./firebase";
import SideBarContainer from "./sidebar/SideBarContainer";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import firebase from "firebase/app";
import "./css/Follow.css";

function Follow() {
  const [userData, setUserData] = useState(null);
  const [uid, setUid] = useState(null);
  const [followingData, setFollowingData] = useState([]);
  let navigate = useNavigate();
  useEffect(() => {
    // fetch user data
    const fetchUserData = async (uid) => {
      try {
        const docRef = db.collection("users").doc(uid); // get user data
        const docSnapshot = await docRef.get();
        if (docSnapshot.exists) {
          const userData = docSnapshot.data();
          setUserData(userData);
        } else {
          console.log("User not found");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      // check if user is logged in
      if (user) {
        setUid(user.uid);
        fetchUserData(user.uid); // fetch user data
      } else {
        setUid(null);
        setUserData(null); // Clear the user data when the user is logged out
        navigate("/");
      }
    });
    return () => {
      unsubscribe(); // Detach the listener when the component unmounts
    };
  }, []);

  const handleReturn = () => {
    // return to home page
    navigate("/home");
  };

  const fetchFollowingData = async () => {
    const userPromises = userData.Following.map(async (followedUserId) => {
      // fetch following data
      const userDoc = await db.collection("users").doc(followedUserId).get();
      return {
        id: userDoc.id,
        data: userDoc.data(),
      };
    });

    const allFollowingUsersData = await Promise.all(userPromises); // set following data
    setFollowingData(allFollowingUsersData);
    console.log(allFollowingUsersData);
  };

  useEffect(() => {
    // fetch following data
    if (userData) {
      if (userData.Following && userData.Following.length > 0) {
        // check if user is following anyone
        fetchFollowingData();
      } else {
        setFollowingData([]);
      }
    }
  }, [userData]);

  return (
    <div>
      {uid && userData ? ( // check if user is logged in
        <div className="app">
          <SideBarContainer />
          <div>
            <div className="feed">
              <div className="feed_header">
                <div className="flex flex-row">
                  <ArrowBackIcon
                    style={{
                      marginTop: "10px",
                      marginRight: "20px",
                    }}
                    onClick={handleReturn}
                  ></ArrowBackIcon>
                  <div
                    className="font-bold flex"
                    style={{ fontSize: "30px", marginTop: "1px" }}
                  >
                    {userData.username} Following:
                  </div>
                </div>
              </div>
              <div>
                {followingData.length > 0 ? (
                  followingData.map(({ id, data }) => (
                    <div
                      key={id}
                      className="listItem"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "10px",
                        margin: "10px",
                        borderRadius: "10px",
                        cursor: "pointer",
                        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                      }}
                      onClick={() => navigate(`/${data.id}`)}
                    >
                      <div>
                        <p>User ID: {data.id}</p>
                        <p>Username: {data.username}</p>
                        <p>
                          Joined at:{" "}
                          {data.joinedAt.toDate().toLocaleString("en-US")}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div
                    style={{
                      margin: "20px",
                      textAlign: "center",
                    }}
                  >
                    You are not following any users
                  </div>
                )}
              </div>
            </div>
          </div>
          <Widgets />
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
export default Follow;
