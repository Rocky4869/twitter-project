import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./Sidebar";
import CreateTweetDialog from "./CreateTweetDialog";
import LogoutDialog from "./LogoutDialog";
import db from "../firebase";

function SideBarContainer({ uid }) {
  const [openTweet, setOpenTweet] = useState(false);
  const [openLogout, setOpenLogout] = useState(false);
  const [posts, setPosts] = useState([]);

  const handleOpenTweet = () => {
    setOpenTweet(true);
  };

  const handleOpenLogout = () => {
    setOpenLogout(true);
  };

  const handleCloseTweet = () => {
    setOpenTweet(false);
  };

  const handleCloseLogout = () => {
    setOpenLogout(false);
  };

  const handleTweet = (tweetText) => {
    console.log(`Tweeting: ${tweetText}`);
    setOpenTweet(false);
  };

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
