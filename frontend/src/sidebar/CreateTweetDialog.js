import React, { useState, forwardRef } from "react";
import TwitterIcon from "@material-ui/icons/Twitter";
import SidebarOption from "./SidebarOption";
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
import { Avatar } from "@material-ui/core";
import { Close } from "@material-ui/icons";

const CreateTweetDialog = forwardRef(
  ({ open, onClose, onTweet, avatar }, ref) => {
    const [reply, setReply] = useState("");

    const handleReplyChange = (event) => {
      setReply(event.target.value);
    };

    const handleTweet = () => {
      console.log(reply);
      onClose();
    };

    return (
      // <Dialog open={open} onClose={onClose}>
      //   <DialogTitle>Enter your tweet</DialogTitle>
      //   <DialogContent>
      //     <TextField
      //       autoFocus
      //       margin="dense"
      //       label="Tweet"
      //       fullWidth
      //       value={tweetText}
      //       onChange={(event) => setTweetText(event.target.value)}
      //     />
      //   </DialogContent>
      //   <DialogActions>
      //     <Button onClick={onClose} color="primary">
      //       Cancel
      //     </Button>
      //     <Button onClick={handleTweet} color="primary" disabled={!tweetText}>
      //       Tweet
      //     </Button>
      //   </DialogActions>
      // </Dialog>

      <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
        <Box p={2} m={2}>
          <div style={{ display: "flex", justifyContent: "flex-start" }}>
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
                style={{ height: "50px", width: "50px" }}
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
            >
              Enter your reply...
            </TextField>
          </DialogTitle>
          <DialogContent>
            <Typography></Typography>
          </DialogContent>
          <DialogActions
            style={{
              marginTop: "20px",
            }}
          >
            <Grid textAlign="right">
              <Button
                onClick={handleTweet}
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
  }
);
export default CreateTweetDialog;
