import React from 'react'
import { TwitterTimelineEmbed, TwitterShareButton, TwitterFollowButton, TwitterHashtagButton, TwitterMentionButton, TwitterTweetEmbed, TwitterMomentShare, TwitterDMButton, TwitterVideoEmbed, TwitterOnAirButton } from 'react-twitter-embed';
import { Avatar, Button } from '@material-ui/core';
import VerifiedIcon from '@mui/icons-material/Verified';
import './css/TwitterFollow.css';

function TwitterFollow( 
    {
    id,
    displayName,
    username,
    verified,
    text,
    avatar,
    image,
    likes
    }) {
  return (
    <div>
    <div className='twitterfollow'>
        <div className='twitterfollow_avator'>
            <Avatar style={{ height: '50px', width: '50px' }} src={avatar}></Avatar>
        </div>
        <div className="twitterfollow_body">
            <div className='twitterfollow_header'>
                <div className='twitterfollow_headerText'>
                    <h3>
                    {displayName} {" "} {username}
                    <span className='twitterfollow_headerSpecial'>
                        {verified && <VerifiedIcon className="twitterfollow_badge"></VerifiedIcon>} 
                    </span>
                    {" "} @{username}
                    </h3>
                    <br></br>
                    <TwitterFollowButton screenName={username} />                    
                </div>
            </div>
        </div>
    </div>
        
    </div>
  )
}

export default TwitterFollow