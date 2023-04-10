import React, { useState } from "react";
import { BrowserRouter, Routes, Route, withRouter } from "react-router-dom";
import { Button, Switch } from "@material-ui/core";
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

function Setting() {
  return (
    <div className="feed">
      <div className="feed_header">
        <h2>Simplified Twitter</h2>
      </div>
      <div className="flex flex-col">
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
        <div
          style={{
            fontSize: "30px",
          }}
          className="text-center font-bold text-black"
        >
          Privacy Control
        </div>
      </div>
      <div
        className="flex flex-row justify-center"
        style={{ marginTop: "50px" }}
      >
        <div className="font-bold">Show your tweets to public?</div>
        <div style={{ marginLeft: "20px" }}>
          <Switch></Switch>
        </div>
      </div>
    </div>
  );
}

export default Setting;
