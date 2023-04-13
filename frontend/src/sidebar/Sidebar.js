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
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import { Button } from "@material-ui/core";
import { Link, useNavigate, useLocation } from "react-router-dom";
import db from "../firebase";

function Sidebar({ onTweetButtonClick, onLogoutButtonClick, uid }) {
  const [userData, setUserData] = useState(null);

  const location = useLocation();
  const activePage = location.pathname;

  const fetchUserData = async () => {
    try {
      const docRef = db.collection("users").doc(uid);
      const docSnapshot = await docRef.get();
      if (!docSnapshot.empty) {
        const userData = docSnapshot.data();
        setUserData(userData);
        // console.debug(userData);
      } else {
        console.log("User not found");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };
  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <div className="sidebar">
      {/* Twitter icon */}
      <TwitterIcon className="sidebar_twitterIcon" />

      {/* SidebarOption */}
      <Link to="/home" className="link">
        <SidebarOption
          active={activePage === "/home"}
          Icon={HomeIcon}
          text="Home"
        />
      </Link>

      <SidebarOption Icon={BookmarkBorderIcon} text="Following" />

      <SidebarOption Icon={MailOutlineIcon} text="Messages" />

      <Link to={"/profile"} className="link">
        <SidebarOption
          active={activePage === "/profile"}
          Icon={PermIdentityIcon}
          text="Profile"
        />
      </Link>

      <Link to="/setting" className="link">
        <SidebarOption
          active={activePage === "/setting"}
          Icon={MoreHorizIcon}
          text="Setting"
        />
      </Link>

      <Link to="/admin" className="link">
        <SidebarOption
          active={activePage === "/admin"}
          Icon={AdminPanelSettingsIcon}
          text="Admin"
        />
      </Link>

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
