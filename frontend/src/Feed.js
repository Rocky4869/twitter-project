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
    // fetch logged in user data from firestore
    try {
      const userDoc = await db.collection("users").doc(uid).get();
      if (userDoc.exists) {
        setLoggedInUserData(userDoc.data()); // set logged in user data
      }
    } catch (error) {
      console.error("Error fetching logged in user data:", error);
    }
  };

  const fetchUserData = async () => {
    // fetch user data from firestore
    try {
      const docRef = db.collection("users").doc(uid);
      const docSnapshot = await docRef.get();
      if (!docSnapshot.empty) {
        const userData = docSnapshot.data(); // get user data
        setUserData(userData);
      } else {
        console.log("User not found");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const checkAdmin = async () => {
    // check if user is admin
    let role = "";
    try {
      const userSnapshot = await db
        .collection("users")
        .doc(uid)
        .get()
        .then((doc) => {
          console.log((role = doc.data().role)); // get user role
        });
      if (role === "admin") {
        setIsAdmin(true);
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  useEffect(() => {
    // fetch user data and check if user is admin
    fetchUserData();
    checkAdmin();
  });

  const fetchPosts = async () => {
    // fetch posts from firestore
    try {
      if (loggedInUserData) {
        const followedUsers = loggedInUserData.Following;
        const userPostsPromises = followedUsers.map(async (followedUserId) => {
          const querySnapshot = await db
            .collection("posts")
            .orderBy("created_at", "desc") // get posts from followed users
            .get();
          return querySnapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }));
        });
        const allFollowedUserPosts = await Promise.all(userPostsPromises); // get all posts from followed users
        const postArray = [].concat(...allFollowedUserPosts);
        const sortedPosts = postArray.sort((x, y) => {
          return (
            y.data.created_at.toDate().getTime() - // sort posts by date
            x.data.created_at.toDate().getTime()
          );
        });
        setPosts(sortedPosts);
      }
    } catch (error) {
      console.error("Error fetching posts:", error); // if error, set error message
    }
  };

  useEffect(() => {
    // fetch logged in user data
    if (uid) {
      fetchLoggedInUserData();
    }
  }, [uid]);

  useEffect(() => {
    // fetch posts
    if (loggedInUserData) {
      fetchPosts();
    }
  }, [loggedInUserData]);

  useEffect(() => {
    // fetch retweets
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
