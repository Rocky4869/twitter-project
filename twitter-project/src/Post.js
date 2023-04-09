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
    comment_account
    }, ref) => {

        const [tweetMessage, setTweetMessage] = useState("");
      
        const sendComment = (e) => {
          e.preventDefault();
      
          db.collection("comments").add({
            displayName: "Cha Eun Woo",
            username: "eunwo.o_c",
            verified: true,
            text: tweetMessage,
            avatar:
              "https://dep.com.vn/wp-content/uploads/2022/11/phong-cach-thoi-trang-cha-eun-woo-1.jpg",
          });
      
          setTweetMessage("");
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
                        {" "} @{username}
                    </h3>                    
                </div>
                <div className="post_headerDescription">
                        <p>{text}</p>
                </div>
            </div>
            <img src={image}
                alt='' />

            <br></br>

            <div className='post_comment'>
                <Avatar style={{ height: '50px', width: '50px' }} src={comment_avatar} />
                <div className='post_comment_text'>
                    <p>@{comment_account} has commented: {comment_text}</p>
                </div>
            </div>

            <br></br>

            <div className='user_comment'>
                <Avatar style={{ height: '50px', width: '50px' }} src="https://dep.com.vn/wp-content/uploads/2022/11/phong-cach-thoi-trang-cha-eun-woo-1.jpg" />
                <input
                onChange={(e) => setTweetMessage(e.target.value)}
                value={tweetMessage}
                placeholder="Your response?"
                type="text"/>
            </div>

            
            <div className='post_footer'>
                <SidebarOption Icon={MapsUgcOutlinedIcon} onClick={sendComment}/>
                <SidebarOption Icon={RepeatIcon} />
                <SidebarOption Icon={FavoriteBorderIcon} text={likes} />
                <SidebarOption Icon={PublishIcon} />

                {/*

                <Button 
                onclick={sendTweet} 
                type="submit">
                    Comment
                </Button>

                <button onclick={handleClick}>Open Popup</button>
                <MapsUgcOutlinedIcon fontsize='small' />
                <RepeatIcon fontSize="small" />
                <FavoriteBorderIcon fontSize="small" />
                <PublishIcon fontSize="small" />

                */}
            </div>
        </div>
    </div>
  );
} );

export default Post