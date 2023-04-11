import React from 'react';
import "./Widgets.css";
//import { TwitterTimelineEmbed, TwitterTweetEmbed } from "react-twitter-embed";
import { TwitterTimelineEmbed, TwitterShareButton, TwitterFollowButton, TwitterHashtagButton, TwitterMentionButton, TwitterTweetEmbed, TwitterMomentShare, TwitterDMButton, TwitterVideoEmbed, TwitterOnAirButton } from 'react-twitter-embed';
import SearchIcon from "@material-ui/icons/Search";

const Widgets = () => {
    return(
        <div className='widgets'>
            <div className='widgets_input'>
                <SearchIcon className="widgets_searchIcon" />
                <input placeholder='Search Twitter' type="text" />
            </div>
            <div className='widgets_widgetContainer_follow'>
                <h2>You may also like</h2>
                <TwitterFollowButton
                    screenName={'ivestarship'}/>
                <TwitterFollowButton
                    screenName={'blackpink'}/>
                <TwitterFollowButton
                    screenName={'le_sserafim'}/>
            </div>
            <div className='widgets_widgetContainer'>
                <h2>What's happening</h2>
                <TwitterTweetEmbed tweetId={'1645351004358029312'}/>
                <TwitterTimelineEmbed 
                    sourceType="profile"
                    screenName="IVEstarship"
                    options={{ height: 400 }}
                />
            </div>
        </div>
    )
}

export default Widgets