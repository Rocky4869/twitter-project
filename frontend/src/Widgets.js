import React from 'react';
import "./Widgets.css";
import {
    TwitterTimelineEmbed,
    TwitterTweetEmbed,
  } from "react-twitter-embed";
import SearchIcon from "@material-ui/icons/Search";

function Widgets() {
    return(
        <div className='widgets'>
            <div className='widgets_input'>
                <SearchIcon className="widgets_searchIcon" />
                <input placeholder='Search Twitter' type="text" />
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