/*
The program have referenced Rafeh Qazi's https://github.com/CleverProgrammers/twitter-clone with modification

Documentation by ChatGPT (modified):

Comment.js defines a React functional component named "Comment" that renders a comment box. It takes in the following props:

avatar: A string representing the URL to the user's avatar image.
displayName: A string representing the user's display name.
image: A string representing the URL to an image associated with the comment (optional).
text: A string representing the comment text.
username: A string representing the user's username.
verified: A boolean indicating whether the user is verified.

The component renders these props along with an Avatar component from the Material-UI library and a VerifiedIcon component from the MUI icon library. 
The comment box is structured using HTML div elements with CSS classes that style the layout. 
The component is exported as the default export so it can be used in other modules.
*/ 


import React from "react";
import "./css/Comment.css";
import { Avatar } from "@material-ui/core";
import VerifiedIcon from "@mui/icons-material/Verified";

const Comment = ({ avatar, displayName, image, text, username, verified }) => {
  return (
    <div className="post_comment">
      <div className="post">
        <div className="post_avator">
          <Avatar
            style={{ height: "50px", width: "50px" }}
            src={avatar}
          ></Avatar>
        </div>
        <div className="post_body">
          <div className="post_header">
            <div className="post_headerText">
              <h3>
                {displayName}{" "}
                <span className="post_headerSpecial">
                  {verified && (
                    <VerifiedIcon className="post_badge"></VerifiedIcon>
                  )}
                </span>{" "}
                @{username} has commented: {text}
              </h3>
            </div>
            <br></br>
          </div>
          <img src={image} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Comment;
