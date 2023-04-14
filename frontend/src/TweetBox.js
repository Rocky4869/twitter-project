import React, { useState, useEffect } from "react";
import "./css/TweetBox.css";
import { Avatar, Button, TextField } from "@material-ui/core";
import db from "./firebase";
import { IconButton } from "@mui/material";
import { InsertEmoticon, Image } from "@material-ui/icons";
import Picker from "emoji-picker-react";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";

function TweetBox({ uid, onPostSubmit }) {
  const [tweetMessage, setTweetMessage] = useState("");
  const [tweetImage, setTweetImage] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [userData, setUserData] = useState(null);

  const fetchUserData = async () => {
    try {
      const docRef = db.collection("users").doc(uid);
      const docSnapshot = await docRef.get();
      if (!docSnapshot.empty) {
        const userData = docSnapshot.data();
        setUserData(userData);
      } else {
        console.log("User not found");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };
  useEffect(() => {
    fetchUserData();
  }, []);
  // useEffect(() => {
  //   if (userData) {
  //     alert("User data: " + userData.username);
  //   }
  // }, [userData]);
  const isImage = (file) => {
    return file && /^image\/(gif|jpe?g|tiff?|png|webp|bmp)$/i.test(file.type);
  };

  const isVideo = (file) => {
    return (
      file && /^video\/(mp4|webm|ogg|mov|avi|wmv|flv|3gp)$/i.test(file.type)
    );
  };

  const sendTweet = async (e) => {
    e.preventDefault();
    const storageRef = firebase.storage().ref();
    let fileURL = "";
    if (selectedImage) {
      const uploadTask = storageRef
        .child(`images/${selectedImage.name}`)
        .put(selectedImage);
      // alert(selectedImage.name);
      await new Promise((resolve, reject) => {
        uploadTask.on(
          "state_changed",
          null,
          (error) => {
            console.error("Upload error:", error);
            reject(error);
          },
          async () => {
            const downloadURL = await uploadTask.snapshot.ref.getDownloadURL();
            console.log("File available at", downloadURL);
            fileURL = downloadURL;
            resolve();
          }
        );
      });
    }
    const querySnapshot = await db.collection("posts").get();
    const postCount = querySnapshot.size;
    let defaultPostId;
    let isUnique = false;
    while (!isUnique) {
      defaultPostId = "post" + (postCount + 1);

      const existingUserSnapshot = await db
        .collection("posts")
        .where("postId", "==", defaultPostId)
        .get();

      if (existingUserSnapshot.empty) {
        isUnique = true;
      } else {
        postCount++;
      }
    }
    const timestamp = firebase.firestore.Timestamp.now();
    await db.collection("posts").add({
      // displayName: "Cha Eun Woo",
      // username: "eunwo.o_c",
      // verified: true,
      // text: tweetMessage,
      // image: tweetImage,
      // avatar:
      //   "https://dep.com.vn/wp-content/uploads/2022/11/phong-cach-thoi-trang-cha-eun-woo-1.jpg",
      displayName: userData.username,
      displayId: userData.id,
      userId: uid,
      // verified: true,
      likes: 0,
      text: tweetMessage,
      image: fileURL,
      created_at: timestamp,
      //use it self user avatar instead
      avatar:
        userData.avator,
        postId: defaultPostId,
    });
    if (onPostSubmit) {
      onPostSubmit();
    }
    setSelectedImage("");
    setTweetMessage("");
    setTweetImage("");
  };

  const handleOpenEmoji = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const onEmojiClick = (emojiObject) => {
    setTweetMessage(tweetMessage + emojiObject.emoji);
  };

  const handleOpenImage = () => {
    const fileInput = document.getElementById("image-input");
    fileInput.click();
  };

  const handleImageSelect = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
    // alert(URL.createObjectURL(file));
    // setTweetMessage(tweetMessage + file);
  };

  const closePreview = () => {
    setSelectedImage(null);
  };

  return (
    <div>
    {userData && (
    <div className="tweetBox">
      <form>
        <div className="tweetBox_input">
          <Avatar
            style={{ height: "90px", width: "90px" }}
            src={userData.avator}
          />
          <TextField
            autoFocus
            margin="dense"
            label="What's happening?"
            type="text"
            fullWidth
            multiline
            minRows={6}
            maxRows={8}
            value={tweetMessage}
            onChange={(e) => setTweetMessage(e.target.value)}
            style={{
              fontWeight: "bold",
              color: "gray",
              marginLeft: "30px",
              marginTop: "5px",
            }}
            InputProps={{
              endAdornment: (
                <>
                  <IconButton onClick={handleOpenEmoji}>
                    <InsertEmoticon />
                  </IconButton>
                  <IconButton onClick={handleOpenImage}>
                    <Image />
                    <input
                      id="image-input"
                      type="file"
                      accept="image/*,video/*"
                      style={{ display: "none" }}
                      onChange={handleImageSelect}
                    />
                  </IconButton>
                </>
              ),
            }}
          >
            Enter your reply...
          </TextField>
        </div>
        <TextField
          value={tweetImage}
          onChange={(e) => setTweetImage(e.target.value)}
          className="tweetBox_imageInput"
          label="Optional: Enter image URL"
          type="text"
          InputProps={{ disableUnderline: !tweetImage }}
          style={{
            marginLeft: "30px",
          }}
        />
        {showEmojiPicker && (
          <Picker onEmojiClick={onEmojiClick} height={400} width={300} />
        )}
        {selectedImage && (
          <div>
            <div className="flex flex-row ">
              <div
                style={{
                  marginBottom: "10px",
                  alignItems: "center",
                  marginLeft: "30px",
                }}
              >
                File Preview:
              </div>
              <Button
                variant="contained"
                color="primary"
                style={{
                  border: "1px solid #C4C4C4",
                  boxShadow: "2px solid rgba(0, 0, 0, 0.2)",
                  width: "150px",
                  marginLeft: "auto",
                  textTransform: "none",
                  borderRadius: "20px",
                  marginBottom: "10px",
                }}
                onClick={closePreview}
              >
                Close Preview
              </Button>
            </div>
            {isImage(selectedImage) && (
              <img
                src={URL.createObjectURL(selectedImage)}
                alt="Selected image"
                style={{
                  maxWidth: "50%",
                  marginLeft: "30px",
                }}
              />
            )}
            {isVideo(selectedImage) && (
              <video
                src={URL.createObjectURL(selectedImage)}
                controls
                style={{
                  maxWidth: "50%",
                  marginLeft: "30px",
                }}
              />
            )}
          </div>
        )}
        <Button
          onClick={sendTweet}
          type="submit"
          className="tweetBox_tweetButton"
        >
          Tweet
        </Button>
      </form>
    </div>
    )}
    </div>
  );
}

export default TweetBox;
