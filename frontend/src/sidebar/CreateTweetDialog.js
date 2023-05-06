/*

Documentation by ChatGPT (modified):

This a React component that renders a dialog box for creating a new tweet. 
It imports various Material UI components such as Button, TextField, Dialog, DialogTitle, DialogContent, DialogActions, Box, Grid, IconButton, and Avatar. 
It also imports other dependencies such as firebase, emoji-picker-react, and firebase/firestore.

The component takes in several props such as open, onClose, avatar, uid, and onPostSubmit. 
It uses the useState and useEffect hooks to manage the state of the tweet message, tweet image, selected image, showEmojiPicker, and userData. 
It also defines several helper functions such as isImage, isVideo, sendTweet, handleOpenEmoji, onEmojiClick, handleOpenImage, handleImageSelect, and closePreview.

The component renders a dialog box with a title, an avatar, a text field for entering the tweet message, and buttons for adding emojis and images. 
It also renders an emoji picker and an image preview if the user selects an image. Finally, renders a submit button for sending the tweet. 
When the user clicks the submit button, the calls the sendTweet function to add the tweet to the firestore database.

*/

import React, { useState, useEffect, forwardRef } from "react";
import { Button, TextField } from "@material-ui/core";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Grid,
  IconButton,
} from "@mui/material";
import db from "../firebase";
import { Avatar } from "@material-ui/core";
import { Close, InsertEmoticon, Image } from "@material-ui/icons";
import Picker from "emoji-picker-react";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";

const CreateTweetDialog = forwardRef(
  ({ open, onClose, avatar, uid, onPostSubmit }, ref) => {
    const [tweetMessage, setTweetMessage] = useState("");
    const [tweetImage, setTweetImage] = useState("");
    const [selectedImage, setSelectedImage] = useState(null);
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [userData, setUserData] = useState(null);

    const fetchUserData = async () => {
      // fetch user data from firestore
      try {
        const docRef = db.collection("users").doc(uid); // query user data from firestore
        const docSnapshot = await docRef.get();
        if (!docSnapshot.empty) {
          const userData = docSnapshot.data(); // get user data
          setUserData(userData);
        } else {
          console.log("User not found");
        }
      } catch (error) {
        console.error("Error fetching user data:", error); // if error, set error message
      }
    };

    useEffect(() => {
      fetchUserData();
    }, []);

    const isImage = (file) => {
      return file && /^image\/(gif|jpe?g|tiff?|png|webp|bmp)$/i.test(file.type); // check if file is image
    };

    const isVideo = (file) => {
      return (
        file && /^video\/(mp4|webm|ogg|mov|avi|wmv|flv|3gp)$/i.test(file.type) // check if file is video
      );
    };

    const sendTweet = async (e) => {
      // send tweet
      e.preventDefault();
      const storageRef = firebase.storage().ref(); // get storage reference
      let fileURL = "";
      if (selectedImage) {
        const uploadTask = storageRef
          .child(`images/${selectedImage.name}`)
          .put(selectedImage);
        // alert(selectedImage.name);
        await new Promise((resolve, reject) => {
          // upload image to storage
          uploadTask.on(
            "state_changed",
            null,
            (error) => {
              console.error("Upload error:", error); // if error, set error message
              reject(error);
            },
            async () => {
              const downloadURL =
                await uploadTask.snapshot.ref.getDownloadURL(); // get download url
              console.log("File available at", downloadURL);
              fileURL = downloadURL;
              resolve();
            }
          );
        });
      }

      const timestamp = firebase.firestore.Timestamp.now(); // get current timestamp
      await db.collection("posts").add({
        // add post to firestore
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
          "https://dep.com.vn/wp-content/uploads/2022/11/phong-cach-thoi-trang-cha-eun-woo-1.jpg",
      });
      if (onPostSubmit) {
        // if onPostSubmit is defined, call it
        onPostSubmit();
      }
      setSelectedImage("");
      setTweetMessage("");
      setTweetImage("");
    };

    const handleOpenEmoji = () => {
      // open emoji picker
      setShowEmojiPicker(!showEmojiPicker);
    };

    const onEmojiClick = (emojiObject) => {
      // add emoji to tweet message
      setTweetMessage(tweetMessage + emojiObject.emoji);
    };

    const handleOpenImage = () => {
      // open file input
      const fileInput = document.getElementById("image-input");
      fileInput.click();
    };

    const handleImageSelect = (event) => {
      // handle image select
      const file = event.target.files[0];
      setSelectedImage(file);
    };

    const closePreview = () => {
      // close image preview
      setSelectedImage(null);
    };

    return (
      <Dialog
        open={open}
        onClose={onClose}
        maxWidth="sm"
        fullWidth
        PaperProps={{ style: { borderRadius: 20 } }}
      >
        <Box p={2} m={2}>
          <div
            style={{
              display: "flex",
            }}
          >
            <IconButton onClick={onClose}>
              <Close />
            </IconButton>
          </div>
          <DialogTitle
            style={{
              display: "flex",
            }}
          >
            <div ref={ref}>
              <Avatar
                style={{ height: "50px", width: "50px", marginLeft: "10px" }}
                src={avatar}
              ></Avatar>
            </div>
            <TextField
              autoFocus
              margin="dense"
              label="Enter your reply..."
              type="text"
              fullWidth
              multiline
              maxRows={6}
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
                        accept="image/*"
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
          </DialogTitle>
          <DialogContent>
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
                    }}
                  >
                    Image Preview:
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
                      maxWidth: "80%",
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
          </DialogContent>
          <DialogActions>
            <Grid textAlign="right">
              <Button type="submit" className="tweetBox_tweetButton">
                Tweet
              </Button>
            </Grid>
          </DialogActions>
        </Box>
      </Dialog>
    );
  }
);
export default CreateTweetDialog;
