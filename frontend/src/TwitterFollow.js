/*
Documentation by ChatGPT (modified):

The TwitterFollow.js file is a React component that allows users to display a Twitter follow button along with the user's avatar, display name, username, and verification status.

The component imports the TwitterFollowButton component from the "react-twitter-embed" library and the Avatar component from the "@material-ui/core" library. 
It also imports the VerifiedIcon component from the "@mui/icons-material" library and a CSS file for styling.

The TwitterFollow function takes in four props: displayName, username, verified, and avatar. 
The function returns a div that contains the user's avatar and a div that contains the user's display name, username, and Twitter follow button.

If the user is verified, a VerifiedIcon badge is displayed next to the user's display name. 
The TwitterFollowButton component is passed the user's username as a prop to display the follow button for that user.

The component is exported as a default export to be used in other React components.
*/

import React from "react";
import { TwitterFollowButton } from "react-twitter-embed";
import { Avatar } from "@material-ui/core";
import VerifiedIcon from "@mui/icons-material/Verified";
import "./css/TwitterFollow.css";

function TwitterFollow({ displayName, username, verified, avatar }) { 
  return (
    <div>
      <div className="twitterfollow">
        <div className="twitterfollow_avator">
          <Avatar
            style={{ height: "50px", width: "50px" }}
            src={avatar}
          ></Avatar>
        </div>
        <div className="twitterfollow_body">
          <div className="twitterfollow_header">
            <div className="twitterfollow_headerText">
              <h3>
                {displayName}{" "}
                <span className="twitterfollow_headerSpecial">
                  {verified && (
                    <VerifiedIcon className="twitterfollow_badge"></VerifiedIcon>
                  )}
                </span>{" "}
                @{username}
              </h3>
              <br></br>
              <TwitterFollowButton screenName={username} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TwitterFollow;
