/*

Documentation by ChatGPT (modified):

The LogoutDialog component is a React functional component that displays a dialog box to confirm the user's intention to log out of the Twitter application. 
It imports several components from the Material-UI and MUI libraries, including Button, Dialog, DialogTitle, DialogContent, DialogActions, Typography, Box, Grid, and IconButton. 
It also imports icons from the @material-ui/icons library, including Close, InsertEmoticon, and Image.

The component takes three props: open, onClose, and history. 
The open prop is a boolean that determines whether the dialog box is open or closed. 
The onClose prop is a function that is called when the user clicks the close button or cancels the logout action. 
The history prop is not used in the component.

The LogoutDialog component defines a handleLogout function that is called when the user clicks the logout button. 
This function signs the user out of the Twitter application using Firebase authentication, displays a success message using the toast function from the react-toastify library, and navigates the user to the home page using the useNavigate hook from the react-router-dom library.

The component renders a Dialog component from the Material-UI library that displays the logout confirmation dialog box. 
The dialog box includes a close button, a Twitter logo, a title, a message, and two buttons: a logout button and a cancel button.
The logout button calls the handleLogout function when clicked, and the cancel button calls the onClose function when clicked. 
The dialog box is styled using the PaperProps prop to set the border radius to 20.

*/

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@material-ui/core";
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
import firebase from "firebase/app";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function LogoutDialog({ open, onClose, history }) {
  // history is not used
  let navigate = useNavigate();

  const handeleLogout = async () => {
    // handle logout
    onClose();
    try {
      await firebase.auth().signOut(); // sign out
      toast.success("Log out successfully!");
      navigate("/");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <Dialog
      open={open}
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
            You can always log back in at any time. If you just want to switch
            accounts, you can do that by adding an existing account.
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
                onClick={handeleLogout}
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

export default LogoutDialog;
