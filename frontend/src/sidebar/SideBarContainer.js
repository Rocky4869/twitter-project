import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./Sidebar";
import CreateTweetDialog from "./CreateTweetDialog";
import LogoutDialog from "./LogoutDialog";

function SideBarContainer() {
  const [openTweet, setOpenTweet] = useState(false);
  const [openLogout, setOpenLogout] = useState(false);

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

  return (
    <div>
      <Sidebar
        onTweetButtonClick={handleOpenTweet}
        onLogoutButtonClick={handleOpenLogout}
      />
      <CreateTweetDialog
        open={openTweet}
        onClose={handleCloseTweet}
        onTweet={handleTweet}
      />
      <LogoutDialog open={openLogout} onClose={handleCloseLogout} />
    </div>
  );
}

export default SideBarContainer;
