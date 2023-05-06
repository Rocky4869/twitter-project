import React from "react";
import { TwitterTimelineEmbed } from "react-twitter-embed";
import "./css/TwitterTrending.css";

function TwitterTrending({ username }) {
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
