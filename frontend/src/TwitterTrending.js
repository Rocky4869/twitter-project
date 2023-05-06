/*
Documentation by ChatGPT (modified):

The TwitterTrending.js file is a React component that allows users to embed a Twitter timeline into their web application. 
It imports several components from the "react-twitter-embed" library, including TwitterTimelineEmbed, TwitterShareButton, TwitterFollowButton, TwitterHashtagButton, TwitterMentionButton, TwitterTweetEmbed, TwitterMomentShare, TwitterDMButton, TwitterVideoEmbed, and TwitterOnAirButton.

The component also imports the Avatar and Button components from the "@material-ui/core" library, as well as the VerifiedIcon from the "@mui/icons-material" library.

The TwitterTrending component takes in several props, including the user's id, display name, username, verification status, tweet text, avatar image, tweet image, and number of likes.

When rendered, the component displays the user's Twitter timeline, sourced by their username, with a height of 400 pixels. The component also includes a CSS file for styling purposes.

Overall, the TwitterTrending component provides an easy way for users to integrate Twitter timelines into their web applications.
*/

import React from "react";
import {
  TwitterTimelineEmbed,
  TwitterShareButton,
  TwitterFollowButton,
  TwitterHashtagButton,
  TwitterMentionButton,
  TwitterTweetEmbed,
  TwitterMomentShare,
  TwitterDMButton,
  TwitterVideoEmbed,
  TwitterOnAirButton,
} from "react-twitter-embed";
import { Avatar, Button } from "@material-ui/core";
import VerifiedIcon from "@mui/icons-material/Verified";
import "./css/TwitterTrending.css";

function TwitterTrending({
  id,
  displayName,
  username,
  verified,
  text,
  avatar,
  image,
  likes,
}) {
  return (
    <div className="twittertrending">
      <TwitterTimelineEmbed
        sourceType="profile"
        screenName={username}
        options={{ height: 400 }}
      />
      <br></br>
    </div>
  );
}

export default TwitterTrending;
