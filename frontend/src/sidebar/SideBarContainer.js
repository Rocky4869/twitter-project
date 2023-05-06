/*
The program have referenced Rafeh Qazi's https://github.com/CleverProgrammers/twitter-clone with great modification

Documentation by ChatGPT (modified):

The SideBarContainer component is a functional component that renders a Sidebar component, a CreateTweetDialog component, and a LogoutDialog component. 
It receives a uid prop, which is used to fetch posts from Firestore.

The component uses the useState hook to manage the state of openTweet, openLogout, and posts. The handleOpenTweet, handleOpenLogout, handleCloseTweet, and handleCloseLogout functions are used to open and close the tweet and logout dialogs.

The handleTweet function is called when a user submits a tweet. Currently, it only logs the tweet text to the console.

The fetchPosts function is an asynchronous function that fetches posts from Firestore. 
It uses the useEffect hook to fetch posts when the uid prop changes. 
The fetched posts are stored in the posts state.

The component returns the Sidebar component, which receives the handleOpenTweet, handleOpenLogout, and uid props. 
It also returns the CreateTweetDialog component, which receives the open, onClose, onTweet, uid, and onPostSubmit props. Finally, it returns the LogoutDialog component, which receives the open and onClose props.
*/

import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import CreateTweetDialog from "./CreateTweetDialog";
import LogoutDialog from "./LogoutDialog";
import db from "../firebase";

function SideBarContainer({ uid }) {
  const [openTweet, setOpenTweet] = useState(false);
  const [openLogout, setOpenLogout] = useState(false);
  const [posts, setPosts] = useState([]);

  const handleOpenTweet = () => {
    // open tweet dialog
    setOpenTweet(true);
  };

  const handleOpenLogout = () => {
    // open logout dialog
    setOpenLogout(true);
  };

  const handleCloseTweet = () => {
    // close tweet dialog
    setOpenTweet(false);
  };

  const handleCloseLogout = () => {
    // close logout dialog
    setOpenLogout(false);
  };

  const handleTweet = (tweetText) => {
    // handle tweet
    console.log(`Tweeting: ${tweetText}`);
    setOpenTweet(false);
  };

  const fetchPosts = async () => {
    // fetch posts from firestore
    try {
      const querySnapshot = await db // query posts from firestore
        .collection("posts")
        .where("userId", "==", uid)
        .orderBy("created_at", "desc")
        .get();

      const userPosts = querySnapshot.docs.map((doc) => ({
        // get posts
        id: doc.id,
        data: doc.data(),
      }));

      setPosts(userPosts); // set posts
    } catch (error) {
      console.error("Error fetching posts:", error); // if error, set error message
    }
  };
  useEffect(() => {
    // fetch posts when uid changes
    if (uid) {
      fetchPosts();
    }
  }, [uid]);

  return (
    <div>
      <Sidebar
        onTweetButtonClick={handleOpenTweet}
        onLogoutButtonClick={handleOpenLogout}
        uid={uid}
      />
      <CreateTweetDialog
        open={openTweet}
        onClose={handleCloseTweet}
        onTweet={handleTweet}
        uid={uid}
        onPostSubmit={fetchPosts}
      />
      <LogoutDialog open={openLogout} onClose={handleCloseLogout} />
    </div>
  );
}

export default SideBarContainer;
