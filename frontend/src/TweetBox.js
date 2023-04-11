import React, { useState } from "react";
import "./css/TweetBox.css";
import { Avatar, Button, TextField } from "@material-ui/core";
import db from "./firebase";
import { IconButton } from "@mui/material";
import { InsertEmoticon, Image } from "@material-ui/icons";
import Picker from "emoji-picker-react";

function TweetBox() {
  const [tweetMessage, setTweetMessage] = useState("");
  const [tweetImage, setTweetImage] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const sendTweet = (e) => {
    e.preventDefault();

    db.collection("posts").add({
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
    setTweetMessage(tweetMessage + file);
  };

  const closePreview = () => {
    setSelectedImage(null);
  };

  return (
    <div className="tweetBox">
      <form>
        <div className="tweetBox_input">
          <Avatar
            style={{ height: "90px", width: "90px" }}
            src="https://dep.com.vn/wp-content/uploads/2022/11/phong-cach-thoi-trang-cha-eun-woo-1.jpg"
          />
          <TextField
            autoFocus
            margin="dense"
            label="What's happening?"
            type="text"
            fullWidth
            multiline
            rows={6}
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
            <img
              src={URL.createObjectURL(selectedImage)}
              alt="Selected image"
              style={{
                maxWidth: "50%",
              }}
            />
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
  );
}

export default TweetBox;
