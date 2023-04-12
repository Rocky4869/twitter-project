import React, { useState } from "react";
import { BrowserRouter, Routes, Route, withRouter, useNavigate } from "react-router-dom";
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

function LogoutDialog({ open, onClose, history }) {
  let navigate = useNavigate();

  const handeleLogout = async () => {
    onClose();
    try {
      await firebase.auth().signOut();
      console.log("User signed out");
      navigate("/");
    } catch (error) {
      console.error("Error signing out:", error);
    } 
    // history.push("/login"); // This is not working, redirect to login page
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
