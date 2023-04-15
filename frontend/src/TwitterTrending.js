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
