import React, {useEffect, useState} from 'react';
import TweetBox from './TweetBox';
import Post from './Post';
import './Feed.css';
import db from "./firebase";
import Flipmove from 'react-flip-move'

function Feed() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        db.collection('posts').onSnapshot( snapshot => (
            setPosts(snapshot.docs.map(doc => doc.data()))
        ))
    }, [])

    return(
        <div className='feed'>
            {/* Header */}     
            <div className='feed_header'>
                <h2>Simplified Twitter</h2>
            </div>
            
            {/* Tweetbox */}
            <TweetBox />

            {/* Post */}

            <Flipmove>
                {posts.map(post => (
                <Post
                key={post.text}
                displayName={post.displayName}
                username={post.username}
                verified={post.verified}
                text={post.text}
                avatar={post.avatar}
                image={post.image}
                likes={post.likes}
                comment_avatar={post.comment_avatar}
                comment_text={post.comment_text}
                comment_account={post.comment_account}
                />
                ))}
            </Flipmove>             
            
            {/*

            <Post 
            displayName="JISOO♥️"
            username="sooyaaa__"
            verified={true}
            text="꽃 🌹 인기가요 첫 무대!"
            avatar='https://i.redd.it/nl98jug3oxqa1.jpg'
            image="https://64.media.tumblr.com/e1b0e6e81095dd1f1c9ee0e6be38e5ff/9706687db94b09e6-c1/s640x960/d9c3374e7ee85e15fb21604981dacda96a9d1aec.gif"
            />

            */}

            

        </div>
    )
}

export default Feed