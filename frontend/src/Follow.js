/*
Documentation by ChatGPT (modified):

This is a React component called "Follow". It imports various modules such as "useParams", "useNavigate", "useEffect", and "useState". 
It also imports other components such as "Widgets" and "SideBarContainer".

The component fetches user data from Firebase and displays a list of users that the current user is following. 
It also allows the user to navigate to the profile page of each user in the list.

The component has a "handleReturn" function that navigates the user back to the home page. 
It also has a "fetchFollowingData" function that fetches the data of the users that the current user is following.

The component renders a sidebar, a header, and a list of users. If the user is not following any users, a message is displayed indicating that the user is not following anyone.
*/

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
    const fetchUserData = async (uid) => {
      try {
        const docRef = db.collection("users").doc(uid);
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
      if (user) {
        setUid(user.uid);
        fetchUserData(user.uid);
      } else {
        setUid(null);
        setUserData(null); // Clear the user data when the user is logged out
        navigate("/");
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const handleReturn = () => {
    navigate("/home");
  };

  const fetchFollowingData = async () => {
    const userPromises = userData.Following.map(async (followedUserId) => {
      const userDoc = await db.collection("users").doc(followedUserId).get();
      return {
        id: userDoc.id,
        data: userDoc.data(),
      };
    });

    const allFollowingUsersData = await Promise.all(userPromises);
    setFollowingData(allFollowingUsersData);
    console.log(allFollowingUsersData);
  };

  useEffect(() => {
    if (userData) {
      if (userData.Following && userData.Following.length > 0) {
        fetchFollowingData();
      } else {
        setFollowingData([]);
      }
    }
  }, [userData]);

  return (
    <div>
      {uid && userData ? (
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
