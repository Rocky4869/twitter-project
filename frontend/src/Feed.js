import React, { useEffect, useState } from "react";
import TweetBox from "./TweetBox";
import Post from "./Post";
import "./css/Feed.css";
import db from "./firebase";
import Flipmove from "react-flip-move";
import Retweet from "./Retweet";

function Feed() {
  const [posts, setPosts] = useState([]);
  const [loggedInUserData, setLoggedInUserData] = useState(null);
  const [retweets, setRetweets] = useState([]);

  // https://firebase.google.com/docs/firestore/query-data/get-data
  //const querySnapshot = await db.collection("posts").get();

  // https://firebase.google.com/docs/reference/js/firebase.firestore.QuerySnapshot?authuser=0#docs
  //querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

  useEffect(() => {
    db.collection("posts").onSnapshot((snapshot) =>
      //setPosts(snapshot.docs.map(doc => doc.data()))
      setPosts(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })))
    );
  }, []);

  useEffect(() => {
    db.collection("retweets").onSnapshot((snapshot) =>
      setRetweets(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })))
    );
  }, []);

  /*
    const [Comments, setComments] = useState([]);

    useEffect(() => {
        db.collection('posts').doc(id).collection("comments").onSnapshot( snapshot => (  
            setComments(snapshot.docs.map((doc_comment) => ({ id: doc_comment.id, ...doc_comment.data() })))
        ))
    }, [])
    
    const [retweets, setRetweets] = useState([]);

    useEffect(() => {
        db.collection('retweets').onSnapshot( snapshot => (  
            setRetweets(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })))
        ))
    }, [])

    */

  return (
    <div className="feed">
      {/* Header */}
      <div className="feed_header">
        <h2>Simplified Twitter</h2>
      </div>

      {/* Tweetbox */}
      <TweetBox />

      {/* Retweet */}
      <Flipmove>
        {retweets.map((retweet) => (
          <Retweet
            id={retweet.id}
            displayName={retweet.displayName}
            username={retweet.username}
            verified={retweet.verified}
            avatar={retweet.avatar}
            new_likes={retweet.new_likes}
            retweet_id={retweet.retweet_id}
            retweet_displayName={retweet.retweet_displayName}
            retweet_username={retweet.retweet_username}
            retweet_verified={retweet.retweet_verified}
            retweet_text={retweet.retweet_text}
            retweet_avatar={retweet.retweet_avatar}
            retweet_image={retweet.retweet_image}
            retweet_likes={retweet.retweet_likes}
          />
        ))}
      </Flipmove>

      {/*
            <Retweet />

            <Flipmove>
            {retweets.map(retweet => (
            <Retweet
                id={retweet.id}                
                displayName={retweet.displayName}
                username={retweet.username}
                verified={retweet.verified}
                avatar={retweet.avatar}
                retweet_id={retweet.retweet_id}
                retweet_displayName={retweet.retweet_displayName}
                retweet_username={retweet.retweet_username}
                retweet_verified={retweet.retweet_verified}
                retweet_text={retweet.retweet_text}
                retweet_avatar={retweet.retweet_avatar}
                retweet_image={retweet.retweet_image}
                retweet_likes={retweet.retweet_likes}
                />
                ))}
            </Flipmove>
            */}

      {/* Post */}
      <Flipmove>
        {posts.map((post) => (
          <Post
            id={post.id}
            displayName={post.displayName}
            username={post.username}
            verified={post.verified}
            text={post.text}
            avatar={post.avatar}
            image={post.image}
            likes={post.likes}
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
  );
}

export default Feed;
