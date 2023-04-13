import React, { forwardRef } from "react";
import "./css/Comment.css";
import { useState } from "react";
import db from "./firebase";
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

        {/*
    <div className='comment_inner'>
        <div className='post_comment'>
            <Avatar style={{ height: '50px', width: '50px' }} src={avatar} />
            <div className='post_comment_text'>
                <b>{displayName}</b> {" "}
                <span className='post_headerSpecial'>
                    {verified && <VerifiedIcon className="post_badge"></VerifiedIcon>} 
                </span>
                {" "} @{username} has commented: {text}
            </div>
            <img src={image}
                alt='' />
        <br></br>
        </div>
        
    

        {comment_account ? 
        <div className='post_comment'>
            <Avatar style={{ height: '50px', width: '50px' }} src={comment_avatar} />
            <div className='post_comment_text'>
                <p>@{comment_account} has commented: {comment_text}</p>
            </div>
            <br></br>
        </div> : ''}

    */}
      </div>
    </div>
  );
};

export default Comment;
