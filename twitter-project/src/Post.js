import React, {forwardRef, useEffect, useState} from 'react'
import "./Post.css";
import { Avatar, Button } from '@material-ui/core';
import VerifiedIcon from '@mui/icons-material/Verified';
import MapsUgcOutlinedIcon from '@mui/icons-material/MapsUgcOutlined';
import RepeatIcon from "@material-ui/icons/Repeat";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import PublishIcon from "@material-ui/icons/Publish";
import SidebarOption from './SidebarOption';
import db from "./firebase";
import Comment from './Comment';

const Post = forwardRef( (   
    {
    id,
    displayName,
    username,
    verified,
    text,
    avatar,
    image,
    likes
    }, ref) => {

        const [tweetMessage, setTweetMessage] = useState("");
        const [tweetImage, setTweetImage] = useState("");
      
        const sendTweet = (e) => {
          e.preventDefault();
      
          db.collection("posts")
          .doc(id)
          .collection("comments").add({
            displayName: "Cha Eun Woo",
            username: "eunwo.o_c",
            verified: true,
            text: tweetMessage,
            image: tweetImage,
            avatar:
              "https://dep.com.vn/wp-content/uploads/2022/11/phong-cach-thoi-trang-cha-eun-woo-1.jpg",
          });
      
          setTweetMessage("");
          setTweetImage("");
        };

        const [comments, setComments] = useState([]);

        useEffect(() => {
            db.collection('posts').doc(id).collection("comments").onSnapshot( snapshot => (  
                setComments(snapshot.docs.map((doc_comment) => ({ id: doc_comment.id, ...doc_comment.data() })))
            ))
        }, [])

        const sendRetweet = (e) => {
            e.preventDefault();
            alert('Retweet');

            db.collection("retweets").add({
                displayName: "Cha Eun Woo",
                username: "eunwo.o_c",
                verified: true,
                avatar: "https://dep.com.vn/wp-content/uploads/2022/11/phong-cach-thoi-trang-cha-eun-woo-1.jpg",
                new_likes: 0,
                retweet_id: id,
                retweet_displayName: displayName,
                retweet_username: username,
                retweet_verified: verified,
                retweet_text: text,
                retweet_avatar: avatar,
                retweet_image: image,
                retweet_likes: likes
            });
        };

        const [isLiked, setIsLiked] = useState(false);

        const likePost = (e) => {
            e.preventDefault();
        
            db.collection("posts").doc(id).update({
                likes: likes+1
              });         
            setIsLiked(value => !value);
        };

        const unlikePost = (e) => {
            e.preventDefault();
        
            db.collection("posts").doc(id).update({
                likes: likes-1
              });         
            setIsLiked(value => !value);
        };        

        let like_button_status;

        if (isLiked) 
        {
            like_button_status =
            <Button 
                onClick={unlikePost}
                type="submit">
                <SidebarOption active Icon={FavoriteBorderIcon} text={likes} />                
            </Button>;
        }
        else 
        {
            like_button_status =
            <Button 
                onClick={likePost}
                type="submit">
                <SidebarOption Icon={FavoriteBorderIcon} text={likes} />                
            </Button>; 
        };


        /*

  const [retweetMessage, setRetweetMessage] = useState("");
  const [retweetImage, setRetweetImage] = useState("");

  const sendRetweet = (e) => {
    e.preventDefault();

    db.collection("retweets").add({
      displayName: "Cha Eun Woo",
      username: "eunwo.o_c",
      verified: true,
      text: tweetMessage,
      image: tweetImage,
      avatar:
        "https://dep.com.vn/wp-content/uploads/2022/11/phong-cach-thoi-trang-cha-eun-woo-1.jpg",
    });

    setRetweetMessage("");
    setRetweetImage("");

  const like = (e) => {
    e.preventDefault();

    db.collection("retweets").update({
        like: like+1
    });

    setRetweetMessage("");
    setRetweetImage("");
  };        
  
        */

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

            {/*
                <Comment 
                comment_avatar={comment_avatar}
                comment_text={comment_text}
                comment_account={comment_account}/>
            */}

            {comments.map(comment => (
                <Comment
                avatar={comment.avatar}
                displayName={comment.displayName}
                image={comment.image}
                text={comment.text}
                username={comment.username}
                verified={comment.verified}
                />
            ))} 

            {/*
            {comment_account ? 
                <div className='post_comment'>
                    <Avatar style={{ height: '50px', width: '50px' }} src={comment_avatar} />
                    <div className='post_comment_text'>
                        <p>@{comment_account} has commented: {comment_text}</p>
                    </div>
                    <br></br>
                </div> : ''}
            */}

            <form>
            <div className='post_footer'>
                
                <Button 
                onClick={()=>{alert('Comment');}}>
                <SidebarOption active Icon={MapsUgcOutlinedIcon} />
                </Button>

                <Button 
                onClick={sendRetweet}
                type="submit"><SidebarOption Icon={RepeatIcon} /> 
                </Button>

                {like_button_status} 

                <Button 
                onClick={()=>{alert('Share');}}
                type="submit"><SidebarOption Icon={PublishIcon} />
                </Button>
                

                {/*

                <Button 
                onClick={likePost}
                type="submit">
                    <SidebarOption Icon={FavoriteBorderIcon} text={likes} />
                    {like_button_status}                 
                </Button>

                ()=>{alert('Like');}

                <SidebarOption active Icon={MapsUgcOutlinedIcon} />
                <SidebarOption Icon={RepeatIcon} />
                <SidebarOption Icon={FavoriteBorderIcon} text={likes} />
                <SidebarOption Icon={PublishIcon} />

            <div className='user_comment'>
                <Avatar style={{ height: '50px', width: '50px' }} src="https://dep.com.vn/wp-content/uploads/2022/11/phong-cach-thoi-trang-cha-eun-woo-1.jpg" />
                <input
                onChange={(e) => setTweetComment(e.target.value)}
                value={tweetComment}
                placeholder="Your response?"
                type="text"/>
            </div>

                <Button 
                onclick={sendComment} 
                type="submit">Comment 
                </Button>

                <button onclick={handleClick}>Open Popup</button>
                <MapsUgcOutlinedIcon fontsize='small' />
                <RepeatIcon fontSize="small" />
                <FavoriteBorderIcon fontSize="small" />
                <PublishIcon fontSize="small" />

                */}
                
            </div>
            </form>

            <form className='comment_form'>
                <div className="tweetBox_input">
                <Avatar style={{ height: '50px', width: '50px' }} src="https://dep.com.vn/wp-content/uploads/2022/11/phong-cach-thoi-trang-cha-eun-woo-1.jpg" />
                <input
                onChange={(e) => setTweetMessage(e.target.value)}
                value={tweetMessage}
                placeholder="Your response?"
                type="text"
                />
                </div>

                <div className='tweetBox_additional'>
                    <input
                    value={tweetImage}
                    onChange={(e) => setTweetImage(e.target.value)}
                    className="tweetBox_imageInput"
                    placeholder="Mandatory: Enter image URL"
                    type="text"/>

                    <Button
                    onClick={sendTweet}
                    type="submit"
                    className="tweetBox_tweetButton">Reply
                    </Button>
                </div>
            </form>
            <div className='post_id'>
                <h6>Post ID: {id}</h6>
            </div>
        </div>
    </div>
  );
} );

export default Post