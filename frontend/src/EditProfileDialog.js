import { useParams } from "react-router-dom";
import Sidebar from "./sidebar/Sidebar";
import Feed from "./Feed";
import Widgets from "./Widgets";
import "./App.css";
import { useEffect, useState } from "react";
import db from "./firebase";
import SideBarContainer from "./sidebar/SideBarContainer";
import TweetBox from "./TweetBox";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Avatar, Button, TextField } from "@material-ui/core";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
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
import { Close, InsertEmoticon, Image } from "@material-ui/icons";

// testing for edit prfile, later do
function EditProfileDialog({ onClose }) {
  return (
    <Dialog
      // open={open}
      onClose={onClose}
      maxWidth="sm"
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
        <div className="flex justify-center">
          <img
            src="https://img.icons8.com/color/452/twitter--v1.png"
            alt="twitter"
            style={{
              marginTop: "40px",
              marginBottom: "40px",
              width: "50px",
              height: "50px",
            }}
          ></img>
        </div>
        <DialogTitle>
          <Typography
            variant="h5"
            style={{
              fontWeight: "bold",
            }}
          >
            Log out of Twitter?
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Typography
            style={{
              marginTop: "10px",
            }}
          >
            Testing for editing profile
          </Typography>
        </DialogContent>
        <DialogActions
          style={{
            marginTop: "20px",
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Button
                // onClick={handeleLogout}
                variant="contained"
                color="primary"
                style={{
                  textTransform: "none",
                }}
              >
                <Typography variant="subtitle1">Logout</Typography>
              </Button>
            </Grid>
            <Grid item xs={6} textAlign="right">
              <Button
                onClick={onClose}
                variant="contained"
                color="primary"
                style={{
                  textTransform: "none",
                }}
              >
                <Typography variant="subtitle1">Cancel</Typography>
              </Button>
            </Grid>
          </Grid>
        </DialogActions>
      </Box>
    </Dialog>
  );
}

export default EditProfileDialog;
