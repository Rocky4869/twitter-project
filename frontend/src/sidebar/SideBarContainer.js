import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./Sidebar";
import CreateTweetDialog from "./CreateTweetDialog";
import Logout from "./Logout";

function SideBarContainer() {
  const [open, setOpen] = useState(false);

  const handleOpenTweet = () => {
    setOpen(true);
  };

  const handleOpenLogout = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleTweet = (tweetText) => {
    console.log(`Tweeting: ${tweetText}`);
    setOpen(false);
  };

  return (
    <div>
      <Sidebar onClick={handleOpenTweet} />
      <CreateTweetDialog
        open={open}
        onClose={handleClose}
        onTweet={handleTweet}
      />
      {/* <Logout open={open} onClose={handleClose} /> */}
    </div>
  );
}

export default SideBarContainer;
