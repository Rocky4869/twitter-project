/*
The program have referenced Rafeh Qazi's https://github.com/CleverProgrammers/twitter-clone with great modification

Documentation by ChatGPT (modified):

The MyProfile.js file contains the code for the user profile page. 
It imports various components and libraries such as useParams, useNavigate, Widgets, and firebase. 
The code fetches the user data and posts from the Firebase database and displays them on the page.

The fetchPosts function fetches the posts tweeted by the logged-in user and sets the state of the posts. 
The useEffect hook is used to call the fetchPosts function when the uid state changes.

The fetchUserData function fetches the user data from the Firebase database and sets the state of the userData. 
The useEffect hook is used to call the fetchUserData function when the component mounts.

The handleReturn function is used to navigate back to the home page when the user clicks on the back arrow icon.

The code renders the user profile page with the user's avatar, username, introduction, joined date, number of followers and following, and the user's tweets. 
The Flipmove component is used to animate the posts when they are added or removed from the page.

Overall, the MyProfile.js file contains the code for the user profile page and fetches the necessary data from the Firebase database to display on the page.

*/

import { useParams, useNavigate } from "react-router-dom";
import Widgets from "./Widgets";
import "./App.css";
import React, { useEffect, useState } from "react";
import db from "./firebase";
import SideBarContainer from "./sidebar/SideBarContainer";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Avatar, Button } from "@material-ui/core";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import firebase from "firebase/app";
import Post from "./Post";
import Flipmove from "react-flip-move";

function MyProfile() {
  const [userData, setUserData] = useState(null);
  const [uid, setUid] = useState(null);
  let navigate = useNavigate();
  const [posts, setPosts] = useState([]);

  //fetch posts tweet by logged in user
  const fetchPosts = async () => {
    try {
      const querySnapshot = await db
        .collection("posts")
        .where("userId", "==", uid)
        .orderBy("created_at", "desc")
        .get();

      const userPosts = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        data: doc.data(),
      }));

      setPosts(userPosts);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };
  useEffect(() => {
    if (uid) {
      fetchPosts();
    }
  }, [uid]);

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
                    {userData.username}
                  </div>
                </div>
              </div>
              <div
                style={{
                  paddingBottom: "250px",
                  borderBottom: "1px solid var(--twitter-background)",
                }}
              >
                <div
                  style={{
                    backgroundColor: "#FFEBCD",
                    height: "100px",
                    position: "relative",
                  }}
                ></div>
                <div
                  className="flex flex-col"
                  style={{
                    padding: "20px",
                    position: "absolute",
                    top: "100px",
                  }}
                >
                  <Avatar
                    style={{ height: "90px", width: "90px" }}
                    src={userData.avator}
                  />
                  <div className="flex flex-row">
                    <div className="font-bold" style={{ marginTop: "10px" }}>
                      {userData.username}
                    </div>
                    <Button
                      variant="outlined"
                      style={{
                        padding: "5px",
                        color: "white",
                        borderRadius: "30px",
                        fontWeight: "bold",
                        backgroundColor: "black",
                        textTransform: "none",
                        width: "125px",
                        marginLeft: "500px",
                      }}
                    >
                      Edit Profile
                    </Button>
                  </div>
                  <div
                    style={{
                      color: "gray",
                    }}
                  >
                    @{userData.id}
                  </div>
                  <div
                    style={{
                      marginTop: "10px",
                    }}
                    className="flex flex-row"
                  >
                    <div>{userData.introduction}</div>
                  </div>
                  <div
                    style={{
                      marginTop: "20px",
                    }}
                    className="flex flex-row"
                  >
                    <CalendarMonthIcon
                      style={{
                        marginRight: "5px",
                      }}
                    ></CalendarMonthIcon>
                    <span
                      style={{
                        marginTop: "5px",
                      }}
                    >
                      {userData.joinedAt.toDate().toLocaleString("en-US")}
                    </span>
                  </div>
                  <div
                    className="flex flex-row font-bold"
                    style={{
                      marginTop: "20px",
                    }}
                  >
                    <div style={{ marginRight: "10px" }}>
                      {userData.Following.length} Following
                    </div>
                    <div style={{ marginLeft: "10px" }}>
                      {" "}
                      {userData.Followers.length} Followers
                    </div>
                  </div>
                </div>
              </div>
              {/* inside feed */}
              <Flipmove>
                {posts.map((post) => (
                  <Post
                    key={post.id}
                    loggedInUserData={userData}
                    id={post.data.id}
                    displayName={post.data.displayName}
                    username={post.data.displayId}
                    verified={post.data.verified}
                    text={post.data.text}
                    avatar={post.data.avatar}
                    image={post.data.image}
                    likes={post.data.likes}
                    createdAt={post.data.created_at}
                    postId={post.data.postId}
                  />
                ))}
              </Flipmove>
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

export default MyProfile;
