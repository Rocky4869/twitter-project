import React, { forwardRef, useEffect, useState } from "react";
import "./css/Post.css";
import { Avatar, Button, TextField } from "@material-ui/core";
import VerifiedIcon from "@mui/icons-material/Verified";
import MapsUgcOutlinedIcon from "@mui/icons-material/MapsUgcOutlined";
import RepeatIcon from "@material-ui/icons/Repeat";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import PublishIcon from "@material-ui/icons/Publish";
import SidebarOption from "./sidebar/SidebarOption";
import db from "./firebase";
import Comment from "./Comment";

const Post = forwardRef(
  (
    { id, displayName, username, verified, text, avatar, image, likes, createdAt },
    ref
  ) => {
    const [tweetMessage, setTweetMessage] = useState("");
    const [tweetImage, setTweetImage] = useState("");
    const getFileExtension = (url) => {
      const splitUrl = url.split('?')[0];
      return "." + splitUrl.substring(splitUrl.lastIndexOf('.') + 1);
    };
    const isImage = (url) => {
      const ext = getFileExtension(url);
      // alert(ext);
      return /\.(gif|jpe?g|tiff?|png|webp|bmp)$/i.test(ext);
    };
    const isVideo = (url) => {
      const ext = getFileExtension(url);
      return /\.(mp4|webm|ogg|mov|avi|wmv|flv|3gp)$/i.test(ext);
    };
    const sendTweet = (e) => {
      e.preventDefault();

      db.collection("posts").doc(id).collection("comments").add({
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
      db.collection("posts")
        .doc(id)
        .collection("comments")
        .onSnapshot((snapshot) =>
          setComments(
            snapshot.docs.map((doc_comment) => ({
              id: doc_comment.id,
              ...doc_comment.data(),
            }))
          )
        );
    }, []);

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

    return (
      <div className="post" ref={ref}>
        <div className="post_avator">
          <Avatar
            style={{ height: "70px", width: "70px" }}
            src={avatar}
          ></Avatar>
        </div>
        <div className="post_body">
          <div className="post_header">
            <div className="post_headerText">
              <h3>
                {displayName}{" "}
                <span className="post_headerSpecial">
                  {verified && (
                    <VerifiedIcon className="post_badge"></VerifiedIcon>
                  )}
                </span>{" "}
                @{username}
              </h3>
            </div>
            <div className="post_headerDescription">
              <p>{text}</p>
              {/* <p>{image}</p> */}
            {(isImage(image) || isVideo(image)) && <div classname='tempImage'>
              {isImage(image) && <img src={image} alt="image"/>} {isVideo(image) && <video src={image} style={{ width: "100%", height: "100%", objectFit: "contain" }} controls />}
            </div>}
            </div>
          </div>
          {/* <img src={image} alt="" /> 
          style={{ width: "100%", height: "100%", objectFit: "contain" }}
          */}

          <br></br>

          {/*
                <Comment 
                comment_avatar={comment_avatar}
                comment_text={comment_text}
                comment_account={comment_account}/>
            */}

          {comments.map((comment) => (
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

          <div className="post_footer">
            <SidebarOption active Icon={MapsUgcOutlinedIcon} />
            <Button 
                onClick={sendRetweet}
                type="submit"><SidebarOption Icon={RepeatIcon} /> 
            </Button>
            {like_button_status}
            <SidebarOption Icon={PublishIcon} />

            {/*

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

          <form className="comment_form">
            <div className="tweetBox_input">
              <Avatar
                style={{ height: "50px", width: "50px" }}
                src="https://dep.com.vn/wp-content/uploads/2022/11/phong-cach-thoi-trang-cha-eun-woo-1.jpg"
              />
              <TextField
                onChange={(e) => setTweetMessage(e.target.value)}
                value={tweetMessage}
                placeholder="Your response?"
                type="text"
                fullWidth
                InputProps={{
                  disableUnderline: !tweetMessage,
                }}
                style={{
                  marginLeft: "10px",
                  marginTop: "10px",
                }}
              />
            </div>

            <div className="tweetBox_additional">
              <TextField
                value={tweetImage}
                onChange={(e) => setTweetImage(e.target.value)}
                className="tweetBox_imageInput"
                placeholder="Optional: Enter image URL"
                type="text"
                fullWidth
                InputProps={{ disableUnderline: !tweetImage }}
                style={{
                  marginTop: "30px",
                }}
              />
              <Button
                onClick={sendTweet}
                type="submit"
                className="tweetBox_tweetButton"
              >
                Reply
              </Button>
            </div>
          </form>
          <div className="post_id">
             <h6>Post ID: {id}</h6> 
            {/* <h6>Created at: {createdAt.toDate().toLocaleString()}</h6> */}
          </div>
        </div>
      </div>
    );
  }
);

export default Post;
