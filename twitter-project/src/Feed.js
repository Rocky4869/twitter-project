import React, {useEffect, useState} from 'react';
import TweetBox from './TweetBox';
import Post from './Post';
import './css/Feed.css';
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
                />
                ))}
            </Flipmove>
            
            {/*
            <Post 
            displayName="Mun Ka Young"
            username="munkayoung"
            verified={true}
            text="짱!!!"
            avatar='https://image.kpopmap.com/2021/01/moon-gayoung-lens-cover-true-beauty.jpg'
            image="https://img.jjang0u.com/data4/docs/306/202101/06/2a/6ba1f929ead2a5d34df1b318f31c1cdd_139185.gif"
            />
            */}

        </div>
    )
}

export default Feed