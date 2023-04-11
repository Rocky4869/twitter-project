import React from 'react';
import './Retweet.css';
import {forwardRef, useEffect, useState} from 'react';
import { Avatar, Button } from '@material-ui/core';
import VerifiedIcon from '@mui/icons-material/Verified';
import MapsUgcOutlinedIcon from '@mui/icons-material/MapsUgcOutlined';
import RepeatIcon from "@material-ui/icons/Repeat";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import PublishIcon from "@material-ui/icons/Publish";
import SidebarOption from './SidebarOption';
import db from "./firebase";

const Retweet = forwardRef((
    {
    id,                
    displayName,
    username,
    verified,
    avatar,
    retweet_id,
    retweet_displayName,
    retweet_username,
    retweet_verified,
    retweet_text,
    retweet_avatar,
    retweet_image,
    retweet_likes
    }, ref) => {
  return (
    <div className='retweet' ref={ref}>
        <div className='retweet_avator'>
            <Avatar style={{ height: '100px', width: '100px' }} src={avatar}></Avatar>
        </div>
        <div className='retweet_header'>
            <div className='retweet_headerText'>
                <h3>
                    {displayName} {" "}
                    <span className='retweet_headerSpecial'>
                        {verified && <VerifiedIcon className="retweet_badge"></VerifiedIcon>} 
                    </span>
                    {" "} @{username}
                </h3>                    
            </div>
            <div className="retweet_headerDescription">
                <p><b>@{username}</b> has <b>Retweeted</b></p>
            </div>
            <div className='retweet_body'>
                <div className='retweet_avator'>
                    <Avatar style={{ height: '100px', width: '100px' }} src={retweet_avatar}></Avatar>
                </div>
                <div className='retweet_header'>
                    <div className='retweet_headerText'>
                        <h3>
                            {retweet_displayName} {" "}
                            <span className='retweet_headerSpecial'>
                                {retweet_verified && <VerifiedIcon className="retweet_badge"></VerifiedIcon>} 
                            </span>
                            {" "} @{retweet_username}
                        </h3> 
                    </div>
                </div>
            </div>
            </div>
        
    </div>    
  )
});

export default Retweet