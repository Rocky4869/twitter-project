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
