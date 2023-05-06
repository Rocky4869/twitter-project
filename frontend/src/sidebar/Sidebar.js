/*
The program have referenced Rafeh Qazi's https://github.com/CleverProgrammers/twitter-clone with great modification

Documentation by ChatGPT (modified):

The Sidebar.js file contains the code for the sidebar component of a Twitter-like web application. 
The component is built using React and Material-UI icons. 
The component receives three props: onTweetButtonClick, onLogoutButtonClick, and uid.

The component fetches user data from Firestore using the uid prop and sets it to the state variable userData. 
It also checks if the user is an admin by querying the user's role from Firestore and setting the state variable isAdmin accordingly.

The component renders a Twitter icon and four SidebarOption components for Home, Following, Profile, and Setting pages. 
If the user is an admin, it also renders a SidebarOption component for the Admin page.

The component also renders two Button components for Tweet and Logout actions. 
The onTweetButtonClick and onLogoutButtonClick props are passed to these buttons to handle their respective actions.

The component uses the useLocation hook from react-router-dom to determine the active page and passes this information to the SidebarOption components to highlight the active page.

Overall, the Sidebar component provides a navigation menu and actions for the Twitter-like web application.

*/

import React, { useEffect, useState } from "react";
import "../css/Sidebar.css";
import TwitterIcon from "@material-ui/icons/Twitter";
import SidebarOption from "./SidebarOption";
import HomeIcon from "@material-ui/icons/Home";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import PermIdentityIcon from "@material-ui/icons/PermIdentity";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import { Button } from "@material-ui/core";
import { Link, useLocation } from "react-router-dom";
import db from "../firebase";

function Sidebar({ onTweetButtonClick, onLogoutButtonClick, uid }) {
  const [userData, setUserData] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  const location = useLocation();
  const activePage = location.pathname;

  const fetchUserData = async () => {
    // fetch user data from firestore
    try {
      const docRef = db.collection("users").doc(uid); // query user data from firestore
      const docSnapshot = await docRef.get();
      if (!docSnapshot.empty) {
        const userData = docSnapshot.data(); // get user data
        setUserData(userData);
        // console.debug(userData);
      } else {
        console.log("User not found"); // if user not found, set error message
      }
    } catch (error) {
      console.error("Error fetching user data:", error); // if error, set error message
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
        // if user is admin, set isAdmin to true
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
  }, []);

  return (
    <div className="sidebar">
      <TwitterIcon className="sidebar_twitterIcon" />

      <Link to="/home" className="link">
        <SidebarOption
          active={activePage === "/home"}
          Icon={HomeIcon}
          text="Home"
        />
      </Link>
      <Link to="/follow" className="link">
        <SidebarOption
          active={activePage === "/follow"}
          Icon={BookmarkBorderIcon}
          text="Following"
        />
      </Link>

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

      {isAdmin && (
        <Link to="/admin" className="link">
          <SidebarOption
            active={activePage === "/admin"}
            Icon={AdminPanelSettingsIcon}
            text="Admin"
          />
        </Link>
      )}

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
