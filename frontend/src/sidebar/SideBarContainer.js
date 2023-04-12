import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./Sidebar";
import CreateTweetDialog from "./CreateTweetDialog";
import LogoutDialog from "./LogoutDialog";
import Setting from "../Setting";

function SideBarContainer( {uid }) {
  const [openTweet, setOpenTweet] = useState(false);
  const [openLogout, setOpenLogout] = useState(false);
  const [openSetting, setOpenSetting] = useState(false);

  const handleOpenTweet = () => {
    setOpenTweet(true);
  };

  const handleOpenLogout = () => {
    setOpenLogout(true);
  };

  // const handleOpenSetting = () => {
  //   setOpenSetting(true);
  // };

  const handleCloseTweet = () => {
    setOpenTweet(false);
  };

  const handleCloseLogout = () => {
    setOpenLogout(false);
  };

  // const handleCloseSetting = () => {
  //   setOpenSetting(false);
  // };

  const handleTweet = (tweetText) => {
    console.log(`Tweeting: ${tweetText}`);
    setOpenTweet(false);
  };

  return (
    <div>
      <Sidebar
        onTweetButtonClick={handleOpenTweet}
        onLogoutButtonClick={handleOpenLogout}
        uid={ uid }
      />
      <CreateTweetDialog
        open={openTweet}
        onClose={handleCloseTweet}
        onTweet={handleTweet}
      />
      <LogoutDialog open={openLogout} onClose={handleCloseLogout} />

      {/* <Setting open={openSetting} onClose={handleCloseSetting} /> */}
    </div>
  );
}

export default SideBarContainer;
