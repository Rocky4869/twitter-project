/*
The program have referenced Rafeh Qazi's https://github.com/CleverProgrammers/twitter-clone with great modification

Documentation by ChatGPT (modified):

The Widgets.js file contains the code for the widgets section of a Twitter clone application. 
It imports various components from React, Material UI, and Firebase. The file exports a functional component called Widgets, which takes in two props: avatar and uid.

The component renders a search bar that allows users to search for other users by their username or ID. 
As the user types in the search bar, the component queries the Firebase database for matching usernames or IDs and displays the results in a dropdown menu. 
Clicking on a search result navigates the user to that user's profile page.

The component also displays two sections of Twitter posts: "You may also like" and "What's happening". 
These sections display the most recent posts from the Firebase database and are limited to three posts each.

The component uses various hooks, including useState, useEffect, useRef, and useNavigate, to manage state and handle user interactions. 
The component also uses Material UI icons and components, such as SearchIcon, CancelIcon, TextField, and Avatar, to style the search bar and search results.

Overall, the Widgets.js file provides the functionality for the widgets section of a Twitter clone application, allowing users to search for other users and view recent posts.
*/

import React from "react";
import "./css/Widgets.css";
import { TwitterTimelineEmbed, TwitterTweetEmbed } from "react-twitter-embed";
import SearchIcon from "@material-ui/icons/Search";
import db from "./firebase";
import { useEffect, useState, useRef, forwardRef } from "react";
import CancelIcon from "@mui/icons-material/Cancel";
import { useNavigate } from "react-router-dom";
import { TextField } from "@material-ui/core";
import { Avatar } from "@material-ui/core";
import firebase from "firebase/app";
import TwitterFollow from "./TwitterFollow";
import TwitterTrending from "./TwitterTrending";

const Widgets = forwardRef(({ avatar, uid }, ref) => {
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [dropdownVisible, setDropdownVisible] = useState(true);
  const dropDownRef = useRef(null);
  const [currentUserid, setUid] = useState(null);
  const [widgetsFollow, setWidgetsFollow] = useState([]);

  let navigate = useNavigate();

  useEffect(() => {
    db.collection("posts").onSnapshot((snapshot) =>
      setWidgetsFollow(
        snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      )
    );
  }, []);

  const [widgetsTrending, setWidgetsTrending] = useState([]);
  useEffect(() => {
    db.collection("posts").onSnapshot((snapshot) =>
      setWidgetsTrending(
        snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      )
    );
  }, []);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUid(user.uid);
      } else {
        setUid(null);
        navigate("/");
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (searchInput.trim() === "") {
      setSearchResults([]);
      return;
    }
    const searchInputNext =
      searchInput.slice(0, -1) +
      String.fromCharCode(searchInput.charCodeAt(searchInput.length - 1) + 1);
    const collectionRef = db.collection("users");
    const queryByName = collectionRef
      .where("username", ">=", searchInput)
      .where("username", "<", searchInputNext)
      .get();
    const queryById = collectionRef
      .where("id", ">=", searchInput)
      .where("id", "<", searchInputNext)
      .get();
    Promise.all([queryByName, queryById])
      .then(([nameSnapshot, idSnapshot]) => {
        const docs = [];

        nameSnapshot.forEach((doc) => {
          // console.log('Document ID:', doc.id);
          // console.log('Document data:', doc.data());
          // console.log('Document data:', doc.data().id);
          docs.push({ id: doc.id, data: doc.data() });
        });

        idSnapshot.forEach((doc) => {
          if (!docs.some((item) => item.id === doc.id)) {
            // console.log('Document ID:', doc.id);
            // console.log('Document data:', doc.data());
            // console.log('Document data:', doc.data().id);
            docs.push({ id: doc.id, data: doc.data() });
          }
        });

        //   console.log(docs.length);
        docs.forEach((doc) => {
          const id = doc.id;
          const data = doc.data;
          const name = doc.data.username;
          // console.log(`Document ID: ${id}`);
          // console.log(`UID: ${currentUserid}`);
          // console.log("Document data:", data);
          // console.log(`userID: ${data.id}`);
          // console.log(`Name: ${name}`);
        });
        setSearchResults(docs);
        //   console.log(searchResults);
      })
      .catch((error) => {
        console.error("Error querying collection:", error);
      });
  }, [searchInput]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropDownRef.current && !dropDownRef.current.contains(event.target)) {
        setDropdownVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleClearButton = () => {
    setSearchInput("");
  };

  const handleItemClick = (userid) => {
    setDropdownVisible(false);
    setSearchInput("");
    navigate(`/${userid}`);
  };

  return (
    <div className="widgets">
      <div className="widgets_input">
        <SearchIcon className="widgets_searchIcon" />
        <TextField
          placeholder="Search by username or ID"
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onFocus={() => setDropdownVisible(true)}
          InputProps={{ disableUnderline: true }}
          fullWidth
        />
        <div className="cancelBtn">
          {searchInput && (
            <CancelIcon
              onClick={handleClearButton}
              style={{ color: "#1da1f2", fontSize: "16px" }}
            />
          )}
        </div>
      </div>
      {dropdownVisible && searchInput.trim() !== "" && (
        <div
          className="dropdown"
          ref={dropDownRef}
          style={{
            marginLeft: "10px",
          }}
        >
          {searchResults.length > 0 ? (
            searchResults
              .filter((doc) => doc.id !== currentUserid)
              .map((doc) => (
                <div
                  className="dropdown-item flex"
                  key={doc.id}
                  onClick={() => handleItemClick(doc.data.id)}
                >
                  <Avatar
                    style={{
                      height: "50px",
                      width: "50px",
                      margin: "10px 25px 10px 10px",
                    }}
                    src={avatar}
                    ref={ref}
                  ></Avatar>
                  <div className="flex flex-col" style={{ marginTop: "15px" }}>
                    <div className="font-bold">{doc.data.username}</div>
                    <div style={{ color: "gray" }}>@{doc.data.id}</div>
                  </div>
                </div>
              ))
          ) : (
            <div className="dropdown-item">
              <p>No such user</p>
            </div>
          )}
        </div>
      )}
      <div className="widgets_widgetContainer_follow">
        <h2>You may also like</h2>

        {widgetsFollow.slice(0, 3).map((widgetFollow) => (
          <TwitterFollow
            id={widgetFollow.id}
            displayName={widgetFollow.displayName}
            username={widgetFollow.username}
            verified={widgetFollow.verified}
            text={widgetFollow.text}
            avatar={widgetFollow.avatar}
            image={widgetFollow.image}
            likes={widgetFollow.likes}
          />
        ))}
      </div>
      <div className="widgets_widgetContainer">
        <h2>What's happening</h2>

        {widgetsTrending.slice(0, 3).map((widgetTrending) => (
          <TwitterTrending
            id={widgetTrending.id}
            displayName={widgetTrending.displayName}
            username={widgetTrending.username}
            verified={widgetTrending.verified}
            text={widgetTrending.text}
            avatar={widgetTrending.avatar}
            image={widgetTrending.image}
            likes={widgetTrending.likes}
          />
        ))}
      </div>
    </div>
  );
});

export default Widgets;
