import React, {forwardRef} from 'react'
import "./Post.css";
import { Avatar, Button } from '@material-ui/core';
import VerifiedIcon from '@mui/icons-material/Verified';
import MapsUgcOutlinedIcon from '@mui/icons-material/MapsUgcOutlined';
import RepeatIcon from "@material-ui/icons/Repeat";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import PublishIcon from "@material-ui/icons/Publish";
import SidebarOption from './SidebarOption';
import { useState } from 'react';
import db from "./firebase";

const Post = forwardRef( (   
    {
    displayName,
    username,
    verified,
    text,
    avatar,
    image,
    likes,
    comment_avatar,
    comment_text,
    comment_account,
    created_at
    }, ref) => {

        const [tweetMessage, setTweetMessage] = useState("");
        const [tweetImage, setTweetImage] = useState("");
      
        const sendTweet = (e) => {
          e.preventDefault();
      
          db.collection("comments").add({
            displayName: "Cha Eun Woo",
            username: "eunwo.o_c",
            verified: true,
            text: tweetMessage,
            image: tweetImage,
            avatar:
              "https://dep.com.vn/wp-content/uploads/2022/11/phong-cach-thoi-trang-cha-eun-woo-1.jpg",
            reply_to: {username}
          });
      
          setTweetMessage("");
          setTweetImage("");
        };

  return (
    <div className='post' ref={ref}>
        <div className='post_avator'>
            <Avatar style={{ height: '100px', width: '100px' }} src={avatar}></Avatar>
        </div>
        <div className="post_body">
            <div className='post_header'>
                <div className='post_headerText'>
                    <h3>
                        {displayName} {" "}
                        <span className='post_headerSpecial'>
                            {verified && <VerifiedIcon className="post_badge"></VerifiedIcon>}
                        </span>
                        {" "} @{username} <p>{created_at}</p>
                    </h3>                    
                </div>
                <div className="post_headerDescription">
                        <p>{text}</p>
                </div>
            </div>
            <img src={image}
                alt='' />

            <br></br>

            {comment_account ? 
                <div className='post_comment'>
                    <Avatar style={{ height: '50px', width: '50px' }} src={comment_avatar} />
                    <div className='post_comment_text'>
                        <p>@{comment_account} has commented: {comment_text}</p>
                    </div>
                    <br></br>
                </div> : ''}

            <div className='post_footer'>
                <SidebarOption active Icon={MapsUgcOutlinedIcon} />
                <SidebarOption Icon={RepeatIcon} />
                <SidebarOption Icon={FavoriteBorderIcon} text={likes} />
                <SidebarOption Icon={PublishIcon} />

                {/*

            <div className='user_comment'>
                <Avatar style={{ height: '50px', width: '50px' }} src="https://dep.com.vn/wp-content/uploads/2022/11/phong-cach-thoi-trang-cha-eun-woo-1.jpg" />
                <input
                onChange={(e) => setTweetComment(e.target.value)}
                value={tweetComment}
                placeholder="Your response?"
                type="text"/>
            </div>

                <Button 
                onclick={sendComment} 
                type="submit">Comment 
                </Button>

                <button onclick={handleClick}>Open Popup</button>
                <MapsUgcOutlinedIcon fontsize='small' />
                <RepeatIcon fontSize="small" />
                <FavoriteBorderIcon fontSize="small" />
                <PublishIcon fontSize="small" />

                */}
                
            </div>

            <form>
                <div className="tweetBox_input">
                <Avatar style={{ height: '50px', width: '50px' }} src="https://dep.com.vn/wp-content/uploads/2022/11/phong-cach-thoi-trang-cha-eun-woo-1.jpg" />
                <input
                onChange={(e) => setTweetMessage(e.target.value)}
                value={tweetMessage}
                placeholder="Your response?"
                type="text"
                />
                </div>

                <div className='tweetBox_additional'>
                    <input
                    value={tweetImage}
                    onChange={(e) => setTweetImage(e.target.value)}
                    className="tweetBox_imageInput"
                    placeholder="Optional: Enter image URL"
                    type="text"/>

                    <Button
                    onClick={sendTweet}
                    type="submit"
                    className="tweetBox_tweetButton">Reply
                    </Button>
                </div>
            </form>
        </div>
    </div>
  );
} );

export default Post