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

const Widgets = forwardRef(({ avatar }, ref) => {
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [dropdownVisible, setDropdownVisible] = useState(true);
  const dropDownRef = useRef(null);
  let navigate = useNavigate();
  useEffect(() => {
    if (searchInput.trim() === "") {
      setSearchResults([]);
      return;
    }
    const searchInputNext =
      searchInput.slice(0, -1) +
      String.fromCharCode(searchInput.charCodeAt(searchInput.length - 1) + 1);
    // // alert("press enter");
    // let results = db.collection('users')
    // .where("name" ,">=", searchInput)
    // .where("name" ,"<", searchInputNext).get()
    // .then((querySnapshot) => {
    //     if (!querySnapshot.empty) {
    //         let docs =[]
    //         querySnapshot.forEach((doc) => {
    //           console.log('Document ID:', doc.id);
    //           console.log('Document data:', doc.data());
    //           console.log('Document data:', doc.data().id);
    //           docs.push(doc.data());
    //         });
    //         setSearchResults(docs);
    //       } else {
    //         console.log('No document found with the specified field value');
    //       }
    //   })
    //   .catch((error) => {
    //     console.error('Error adding document:', error);
    //   });
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
          console.log(`Document ID: ${id}`);
          console.log("Document data:", data);
          console.log(`userID: ${data.id}`);
          console.log(`Name: ${name}`);
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
    // alert("selected item: " + userid);
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
      {dropdownVisible && (
        <div
          className="dropdown"
          ref={dropDownRef}
          style={{
            marginLeft: "10px",
          }}
        >
          {searchResults.map((doc) => (
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
          ))}
        </div>
      )}
      <div className="widgets_widgetContainer">
        <h2>Recommendations</h2>
        <TwitterTweetEmbed tweetId={"1639974872406446084"} />
        <TwitterTimelineEmbed
          sourceType="profile"
          screenName="offclASTRO"
          options={{ height: 400 }}
        />
      </div>
    </div>
  );
});

export default Widgets;
