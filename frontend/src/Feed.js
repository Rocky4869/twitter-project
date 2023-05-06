/*
The program have referenced Rafeh Qazi's https://github.com/CleverProgrammers/twitter-clone with great modification

Documentation by ChatGPT (modified):

The Feed.js file is a React component that renders a feed of posts and retweets. 
It imports several other components, including TweetBox, Post, and Retweet, as well as some CSS styles and a Firebase database instance.

The component uses several state variables, including posts, loggedInUserData, isAdmin, userData, and retweets. 
It also defines several functions for fetching data from the Firebase database, including fetchLoggedInUserData, fetchUserData, checkAdmin, and fetchPosts.

The component uses several useEffect hooks to fetch data from the database and update the state variables accordingly. 
It also uses the Flipmove component from the react-flip-move library to animate the rendering of new posts and retweets.

The component renders a header with the title "Simplified Twitter" or "Simplified Twitter - Admin" depending on whether the logged-in user is an admin. 
It also renders a TweetBox component for creating new posts, and a list of Retweet and Post components for displaying existing retweets and posts, respectively.

Overall, the Feed.js component provides a complete feed of posts and retweets for a Simplified Twitter application.

*/

import React, { useEffect, useState } from "react";
import TweetBox from "./TweetBox";
import Post from "./Post";
import "./css/Feed.css";
import db from "./firebase";
import Flipmove from "react-flip-move";
import Retweet from "./Retweet";

function Feed({ uid }) {
  const [posts, setPosts] = useState([]);
  const [loggedInUserData, setLoggedInUserData] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userData, setUserData] = useState(null);
  const [retweets, setRetweets] = useState([]);

  const fetchLoggedInUserData = async () => {
    try {
      const userDoc = await db.collection("users").doc(uid).get();
      if (userDoc.exists) {
        setLoggedInUserData(userDoc.data());
      }
    } catch (error) {
      console.error("Error fetching logged in user data:", error);
    }
  };

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

  const fetchPosts = async () => {
    try {
      if (loggedInUserData) {
        const followedUsers = loggedInUserData.Following;
        const userPostsPromises = followedUsers.map(async (followedUserId) => {
          const querySnapshot = await db
            .collection("posts")
            // .where("userId", "==", followedUserId)
            .orderBy("created_at", "desc")
            .get();
          return querySnapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }));
        });
        const allFollowedUserPosts = await Promise.all(userPostsPromises);
        const postArray = [].concat(...allFollowedUserPosts);
        const sortedPosts = postArray.sort((x, y) => {
          return (
            y.data.created_at.toDate().getTime() -
            x.data.created_at.toDate().getTime()
          );
        });
        setPosts(sortedPosts);
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  useEffect(() => {
    if (uid) {
      fetchLoggedInUserData();
    }
  }, [uid]);

  useEffect(() => {
    if (loggedInUserData) {
      fetchPosts();
    }
  }, [loggedInUserData]);

  useEffect(() => {
    db.collection("retweets").onSnapshot((snapshot) =>
      setRetweets(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })))
    );
  }, []);

  return (
    <div className="feed">
      {/* Header */}
      <div className="feed_header">
        {isAdmin ? (
          <div classname="admin_header">
            <h2>Simplified Twitter - Admin </h2>
          </div>
        ) : (
          <h2>Simplified Twitter</h2>
        )}
      </div>

      <TweetBox uid={uid} onPostSubmit={fetchPosts} />

      <Flipmove>
        {retweets.map((retweet) => (
          <Retweet
            id={retweet.id}
            displayName={retweet.displayName}
            username={retweet.username}
            verified={retweet.verified}
            avatar={retweet.avatar}
            new_likes={retweet.new_likes}
            retweet_id={retweet.retweet_id}
            retweet_displayName={retweet.retweet_displayName}
            retweet_username={retweet.retweet_username}
            retweet_verified={retweet.retweet_verified}
            retweet_text={retweet.retweet_text}
            retweet_avatar={retweet.retweet_avatar}
            retweet_image={retweet.retweet_image}
            retweet_likes={retweet.retweet_likes}
          />
        ))}
      </Flipmove>

      {loggedInUserData && (
        <Flipmove>
          {posts.map((post) => (
            <Post
              key={post.id}
              loggedInUserData={loggedInUserData}
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
      )}
    </div>
  );
}

export default Feed;
