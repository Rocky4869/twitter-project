import React, { useEffect, useState } from "react";
import TweetBox from "./TweetBox";
import Post from "./Post";
import "./css/Feed.css";
import db from "./firebase";
import Flipmove from "react-flip-move";

function Feed({ uid }) {
  const [posts, setPosts] = useState([]);
  const [loggedInUserData, setLoggedInUserData] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userData, setUserData] = useState(null);

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
        console.debug(userData);
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
              // comment_avatar={post.data.comment_avatar}
              // comment_text={post.data.comment_text}
              // comment_account={post.data.comment_account}
            />
          ))}
        </Flipmove>
      )}
    </div>
  );
}

export default Feed;
