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
            <Post 
            displayName="Mun Ka Young"
            username="munkayoung"
            verified={true}
            text="짱!!!"
            avatar='https://image.kpopmap.com/2021/01/moon-gayoung-lens-cover-true-beauty.jpg'
            image="https://img.jjang0u.com/data4/docs/306/202101/06/2a/6ba1f929ead2a5d34df1b318f31c1cdd_139185.gif"/>
            <Post />
            <Post />
            <Post />
            <Post />
            <Post /> 

        </div>
    )
}

export default Feed