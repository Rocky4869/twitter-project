import React from 'react';
import TweetBox from './TweetBox';
import Post from './Post';
import './Feed.css';

function Feed() {
    return(
        <div className='feed'>
            {/* Header */}     
            <div className='feed_header'>
                <h2>Simplified Twitter</h2>
            </div>
            
            {/* Tweetbox */}
            <TweetBox />

            {/* Post */}
            <Post />
            <Post />
            <Post />
            <Post />
            <Post />
            <Post />

        </div>
    )
}

export default Feed