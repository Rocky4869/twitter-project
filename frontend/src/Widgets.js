import React from 'react';
import "./css/Widgets.css";
import {
    TwitterTimelineEmbed,
    TwitterTweetEmbed,
  } from "react-twitter-embed";
import SearchIcon from "@material-ui/icons/Search";
import db from "./firebase";
import { useEffect, useState } from "react";

function Widgets() {
    const [searchInput, setSearchInput] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    const handleSearch = (e) => {
        e.preventDefault();
        const searchValue = searchInput.trim();
        // alert("press enter");
        
        setSearchInput('');
    };    
    const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
        // alert("press enter");
        handleSearch(e);
        }   
    };
    return(
        <div className='widgets'>
            <div className='widgets_input'>
                <SearchIcon className="widgets_searchIcon" onClick={handleSearch}/>
                <input placeholder='Search by user name or ID'
                    type="text" 
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
            </div>
            <div className='widgets_widgetContainer'>
                <h2>What's happening</h2>
                <TwitterTweetEmbed tweetId={'1639974872406446084'}/>
                <TwitterTimelineEmbed 
                    sourceType="profile"
                    screenName="offclASTRO"
                    options={{ height: 400 }}
                />
            </div>
        </div>
    )
}

export default Widgets