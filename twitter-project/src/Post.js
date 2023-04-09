import React, {forwardRef} from 'react'
import "./Post.css";
import { Avatar } from '@material-ui/core';
import VerifiedIcon from '@mui/icons-material/Verified';
import MapsUgcOutlinedIcon from '@mui/icons-material/MapsUgcOutlined';
import RepeatIcon from "@material-ui/icons/Repeat";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import PublishIcon from "@material-ui/icons/Publish";
import SidebarOption from './SidebarOption';
import Popup from './Popup';
import { useState } from 'react';
import { Button } from "@material-ui/core";

const Post = forwardRef( (   
    {
    displayName,
    username,
    verified,
    text,
    avatar,
    image
    }, ref) => {
        const [tweetMessage, setTweetMessage] = useState("");

        const [buttonPopup, setButtonPopup] = useState(false);

        const handleClick = (e) => {
            e.preventDefault();
            setButtonPopup(true);
            buttonPopup(true);
            alert('ok');
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
            <Avatar style={{ height: '50px', width: '50px' }} src="https://dep.com.vn/wp-content/uploads/2022/11/phong-cach-thoi-trang-cha-eun-woo-1.jpg" />
            <input
                onChange={(e) => setTweetMessage(e.target.value)}
                value={tweetMessage}
                placeholder="Your response?"
                type="text"/>
            </div>

            
            <div className='post_footer'>
                <SidebarOption Icon={MapsUgcOutlinedIcon} onclick={handleClick}/>
                <SidebarOption Icon={RepeatIcon} />
                <SidebarOption Icon={FavoriteBorderIcon} />
                <SidebarOption Icon={PublishIcon} />

                {/*

                <button onclick={handleClick}>Open Popup</button>
                <MapsUgcOutlinedIcon fontsize='small' />
                <RepeatIcon fontSize="small" />
                <FavoriteBorderIcon fontSize="small" />
                <PublishIcon fontSize="small" />

                */}
            </div>
            <Popup trigger={buttonPopup}>
                    <h6>My popup</h6>
            </Popup>
        </div>
    </div>
  );
} );

export default Post