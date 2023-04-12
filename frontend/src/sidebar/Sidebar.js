import React, { useEffect, useState } from "react";
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
import { Link, useNavigate } from "react-router-dom";
import db from "../firebase";

function Sidebar({ onTweetButtonClick, onLogoutButtonClick, uid }) {
  const [userData, setUserData] = useState(null);

  let navigate = useNavigate();

  const fetchUserData = async () => {
    try {
      const docRef = db.collection("users").doc(uid);
      const docSnapshot = await docRef.get();
      if (!docSnapshot.empty) {
        const userData = docSnapshot.data();
        setUserData(userData);
        console.debug("User data:", userData);
      } else {
        console.log("User not found");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };
  useEffect(() => {
    fetchUserData();
  });

  return (
    <div className="sidebar">
      {/* Twitter icon */}
      <TwitterIcon className="sidebar_twitterIcon" />

      {/* SidebarOption */}
      <SidebarOption
        active
        Icon={HomeIcon}
        text="Home"
        onClick={() => navigate("/home")}
      />
      <SidebarOption Icon={BookmarkBorderIcon} text="Following" />
      <SidebarOption Icon={MailOutlineIcon} text="Messages" />

      <SidebarOption
        Icon={PermIdentityIcon}
        text="Profile"
        onClick={() => navigate(`/${userData.id}`)}
      />
      <SidebarOption
        Icon={MoreHorizIcon}
        text="Setting"
        onClick={() => navigate("/setting")}
      />

      {/* <SidebarOption Icon={ListAltIcon} text="Admin" /> */}

      {/* Button -> Tweet */}
      <Button
        variant="outlined"
        className="sidebar__tweet"
        fullWidth
        onClick={onTweetButtonClick}
      >
        Tweet
      </Button>

      <Button
        variant="outlined"
        className="sidebar__logout"
        fullWidth
        style={{
          padding: "15px",
          marginTop: "40px",
          color: "white",
          borderRadius: "30px",
          transition: "background-color 0.2s ease-in-out",
          fontWeight: "bold",
          backgroundColor: "black",
          textTransform: "none",
        }}
        onClick={onLogoutButtonClick}
      >
        Logout
      </Button>
    </div>
  );
}

export default Sidebar;
