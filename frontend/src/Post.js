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
import FavoriteIcon from "@mui/icons-material/Favorite";
import firebase from "firebase/app";
const Post = forwardRef(
  (
    {
      key,
      loggedInUserData,
      id,
      displayName,
      username,
      verified,
      text,
      avatar,
      image,
      likes,
      createdAt,
      postId,
    },
    ref
  ) => {
    const [tweetMessage, setTweetMessage] = useState("");
    const [tweetImage, setTweetImage] = useState("");
    const [comments, setComments] = useState([]);
    const [isLiked, setIsLiked] = useState(
      loggedInUserData && loggedInUserData.postLiked.includes(postId)
    );
    const [postLikes, setPostLikes] = useState(likes);

    const getFileExtension = (url) => {
      const splitUrl = url.split("?")[0];
      return "." + splitUrl.substring(splitUrl.lastIndexOf(".") + 1);
    };
    const isImage = (url) => {
      const ext = getFileExtension(url);
      return /\.(gif|jpe?g|tiff?|png|webp|bmp)$/i.test(ext);
    };
    const isVideo = (url) => {
      const ext = getFileExtension(url);
      return /\.(mp4|webm|ogg|mov|avi|wmv|flv|3gp)$/i.test(ext);
    };
    const sendTweet = (e) => {
      e.preventDefault();

      console.log("send  Tweet");
      console.log(postId);
      if (loggedInUserData && postId) {
        const timestamp = firebase.firestore.Timestamp.now();
        db.collection("posts")
          .where("postId", "==", postId)
          .get()
          .then((querySnapshot) => {
            if (!querySnapshot.empty) {
              const postIdt = querySnapshot.docs[0].id;
              db.collection("posts").doc(postIdt).collection("comments").add({
                displayName: loggedInUserData.username,
                username: loggedInUserData.id,
                verified: false,
                text: tweetMessage,
                image: tweetImage,
                avatar: loggedInUserData.avator,
                createdAt: timestamp,
              });
            }
          });
        setTweetMessage("");
        setTweetImage("");
      }
    };

    useEffect(() => {
      console.log(postId);
      if (postId) {
        // Query the `posts` collection to find the post with the matching `postId`
        db.collection("posts")
          .where("postId", "==", postId)
          .limit(1)
          .get()
          .then((querySnapshot) => {
            if (!querySnapshot.empty) {
              // Get the `postId` from the matching post document
              const postId = querySnapshot.docs[0].id;

              // Fetch the comments for the matching post
              const unsubscribe = db
                .collection("posts")
                .doc(postId)
                .collection("comments")
                .limit(1)
                .onSnapshot((snapshot) => {
                  const fetchedComments = snapshot.docs.map((doc_comment) => ({
                    id: doc_comment.id,
                    ...doc_comment.data(),
                  }));
                  console.log("Fetched comments:", fetchedComments);
                  setComments(fetchedComments);
                });

              return () => {
                unsubscribe();
              };
            }
          });
      }
    }, [postId]);

    const handleLikeToggle = async () => {
      if (loggedInUserData && postId) {
        const postQuery = db.collection("posts").where("postId", "==", postId);
        const userQuery = db
          .collection("users")
          .where("id", "==", loggedInUserData.id);

        const postSnapshot = await postQuery.get();
        const userSnapshot = await userQuery.get();

        if (!postSnapshot.empty && !userSnapshot.empty) {
          const post = postSnapshot.docs[0].data();
          const user = userSnapshot.docs[0].data();
          const liked = user.postLiked.includes(postId);
          // Update the post's likes counter
          await postSnapshot.docs[0].ref.update({
            likes: liked ? post.likes - 1 : post.likes + 1,
          });

          // Update the user's postLiked array
          await userSnapshot.docs[0].ref.update({
            postLiked: liked
              ? user.postLiked.filter((id) => id !== postId)
              : [...user.postLiked, postId],
          });
          setPostLikes(liked ? post.likes - 1 : post.likes + 1);
          setIsLiked(!liked);
        }
      }
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
              {(isImage(image) || isVideo(image)) && (
                <div
                  style={{
                    width: "640px",
                    height: "360px",
                    overflow: "hidden",
                  }}
                >
                  {isImage(image) && (
                    <img
                      src={image}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                      }}
                      alt="image"
                    />
                  )}
                  {isVideo(image) && (
                    <video
                      src={image}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                      }}
                      controls
                    />
                  )}
                </div>
              )}
            </div>
          </div>
          <br></br>
          {/*
                <Comment 
                comment_avatar={comment_avatar}
                comment_text={comment_text}
                comment_account={comment_account}/>
            */}
          Comments:
          {comments.map((comment) => (
            <Comment
              avatar={comment.avatar.url}
              displayName={comment.displayName}
              image={comment.image}
              text={comment.text}
              username={comment.username}
              verified={comment.verified}
            />
          ))}
          <div className="post_footer">
            <SidebarOption active Icon={MapsUgcOutlinedIcon} />
            <SidebarOption Icon={RepeatIcon} />

            <SidebarOption
              Icon={isLiked ? FavoriteIcon : FavoriteBorderIcon}
              text={postLikes}
              onClick={handleLikeToggle}
              iconStyle={{
                color: isLiked ? "red" : "inherit",
              }}
            />

            <SidebarOption Icon={PublishIcon} />
          </div>
          <form className="comment_form">
            <div className="tweetBox_input">
              <Avatar
                style={{ height: "50px", width: "50px" }}
                src={loggedInUserData}
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
                style={{
                  backgroundColor: "var(--twitter-color)",
                  color: "white",
                  fontWeight: "900",
                  borderRadius: "30px",
                  height: "40px",
                  width: "80px",
                  padding: "10px",
                  textTransform: "none",
                }}
              >
                Reply
              </Button>
            </div>
          </form>
          <div className="post_id">
            <h6>Created at: {createdAt.toDate().toLocaleString("en-US")}</h6>
          </div>
        </div>
      </div>
    );
  }
);

export default Post;
