import React, { useState } from "react";
import "../css/Sidebar.css";
import TwitterIcon from "@material-ui/icons/Twitter";
import SidebarOption from "./SidebarOption";
import HomeIcon from "@material-ui/icons/Home";
import SearchIcon from "@material-ui/icons/Search";
import NotificationsNoneIcon from "@material-ui/icons/NotificationsNone";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import ListAltIcon from "@material-ui/icons/ListAlt";
import PermIdentityIcon from "@material-ui/icons/PermIdentity";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import { Button } from "@material-ui/core";

function Sidebar({ onClick }) {
  return (
    <div className="sidebar">
      {/* Twitter icon */}
      <TwitterIcon className="sidebar_twitterIcon" />

      {/* SidebarOption */}
      <SidebarOption active Icon={HomeIcon} text="Home" />
      {/* <SidebarOption Icon={SearchIcon} text="Explore" /> */}
      {/* <SidebarOption Icon={NotificationsNoneIcon} text="Notifications" /> */}
      <SidebarOption Icon={BookmarkBorderIcon} text="Following" />
      <SidebarOption Icon={MailOutlineIcon} text="Messages" />
      <SidebarOption Icon={PermIdentityIcon} text="Profile" />
      <SidebarOption Icon={MoreHorizIcon} text="Setting" />
      {/* <SidebarOption Icon={ListAltIcon} text="Admin" /> */}

      {/* Button -> Tweet */}
      <Button
        variant="outlined"
        className="sidebar__tweet"
        fullWidth
        onClick={onClick}
      >
        Tweet
      </Button>

      <Button
        variant="outlined"
        className="sidebar__logout"
        fullWidth
        style={{
          padding: "15px",
          marginTop: "80px",
          color: "white",
          borderRadius: "30px",
          transition: "background-color 0.2s ease-in-out",
          fontWeight: "bold",
          backgroundColor: "black",
          textTransform: "none",
        }}
        onClick={onClick}
      >
        Logout
      </Button>
    </div>
  );
}

export default Sidebar;
