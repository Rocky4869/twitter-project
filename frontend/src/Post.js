import React, {forwardRef} from 'react'
import "./css/Post.css";
import { Avatar } from '@material-ui/core';
import VerifiedIcon from '@mui/icons-material/Verified';
import MapsUgcOutlinedIcon from '@mui/icons-material/MapsUgcOutlined';
import RepeatIcon from "@material-ui/icons/Repeat";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import PublishIcon from "@material-ui/icons/Publish";

const Post = forwardRef( (   
    {
    displayName,
    username,
    verified,
    text,
    avatar,
    image
    }, ref) => {
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
            <div className='post_footer'>
                <MapsUgcOutlinedIcon fontSize='small' />
                <RepeatIcon fontSize="small" />
                <FavoriteBorderIcon fontSize="small" />
                <PublishIcon fontSize="small" />
            </div>
        </div>
    </div>
  );
} );

export default Post