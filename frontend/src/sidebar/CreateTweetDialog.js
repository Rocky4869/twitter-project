import React, { useState, forwardRef } from "react";
import TwitterIcon from "@material-ui/icons/Twitter";
import HomeIcon from "@material-ui/icons/Home";
import SearchIcon from "@material-ui/icons/Search";
import NotificationsNoneIcon from "@material-ui/icons/NotificationsNone";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import ListAltIcon from "@material-ui/icons/ListAlt";
import PermIdentityIcon from "@material-ui/icons/PermIdentity";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import { Button, TextField } from "@material-ui/core";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Box,
  Grid,
  IconButton,
} from "@mui/material";
import db from "../firebase";
import { Avatar } from "@material-ui/core";
import { Close, InsertEmoticon, Image } from "@material-ui/icons";
import InputAdornment from "@mui/material/InputAdornment";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import ImageIcon from "@mui/icons-material/Image";
import Picker from "emoji-picker-react";

const CreateTweetDialog = forwardRef(({ open, onClose, avatar }, ref) => {
  const [reply, setReply] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  // const handleTweet = () => {
  //   console.log(reply);
  //   onClose();
  // };

  const sendTweet = (e) => {
    e.preventDefault();

    db.collection("posts").add({
      displayName: "Cha Eun Woo",
      username: "eunwo.o_c",
      verified: true,
      text: reply,
      avatar:
        "https://dep.com.vn/wp-content/uploads/2022/11/phong-cach-thoi-trang-cha-eun-woo-1.jpg",
    });
    setReply("");
    onClose();
  };

  const handleReplyChange = (event) => {
    setReply(event.target.value);
  };

  const handleOpenEmoji = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const onEmojiClick = (emojiObject) => {
    setReply(reply + emojiObject.emoji); 
  };

  const handleOpenImage = () => {
    const fileInput = document.getElementById("image-input");
    fileInput.click();
  };

  const handleImageSelect = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
    setReply(reply + file); 
  };

  const closePreview = () => {
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
            value={reply}
            onChange={handleReplyChange}
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
                  maxWidth: "80%",
                }}
              />
            </div>
          )}
          {showEmojiPicker && (
            <Picker onEmojiClick={onEmojiClick} height={400} width={300} />
          )}
        </DialogContent>
        <DialogActions>
          <Grid textAlign="right">
            <Button
              // onClick={sendTweet}
              type="submit"
              className="tweetBox_tweetButton"
            >
              Tweet
            </Button>
          </Grid>
        </DialogActions>
      </Box>
    </Dialog>
  );
});
export default CreateTweetDialog;
