import React, { useState } from "react";
import { BrowserRouter, Routes, Route, withRouter } from "react-router-dom";
import { Button, Switch } from "@material-ui/core";
import PrivacyTipIcon from "@mui/icons-material/PrivacyTip";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import NotificationsIcon from "@mui/icons-material/Notifications";
import BusinessIcon from "@mui/icons-material/Business";
import NewspaperIcon from "@mui/icons-material/Newspaper";
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
  const [isPublicChecked, setIsPublilcChecked] = useState(false);
  const [isAllowAdsChecked, setIsAllowAdsChecked] = useState(false);
  const [isAllowSharingChecked, setIsAllowSharingChecked] = useState(false);
  const [isPushChecked, setIsPushChecked] = useState(false);
  const [isEmojiChecked, setIsEmojiChecked] = useState(false);

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
            fontSize: "25px",
          }}
          className="text-center font-bold text-black"
        >
          Privacy Controls
        </div>
      </div>
      <div
        style={{
          backgroundColor: "#E8F5FE",
          borderRadius: "20px",
          marginTop: "50px",
          padding: "30px 20px",
          width: "600px",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <div
          className="flex flex-row flex-start"
          style={{ marginLeft: "100px" }}
        >
          <PrivacyTipIcon
            style={{ marginTop: "5px", marginRight: "10px" }}
          ></PrivacyTipIcon>
          <div
            className="font-bold"
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            Show your tweets to public?
          </div>
          <div
            style={{
              marginLeft: "30px",
            }}
          >
            <Switch
              checked={isPublicChecked}
              onChange={() => setIsPublilcChecked(!isPublicChecked)}
              color={isPublicChecked ? "primary" : "default"}
            ></Switch>
          </div>
        </div>
        <div
          className="flex flex-row flex-start"
          style={{ marginTop: "50px", marginLeft: "100px" }}
        >
          <NewspaperIcon
            style={{ marginTop: "5px", marginRight: "10px" }}
          ></NewspaperIcon>
          <div
            className="font-bold"
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            Ads preferences?
          </div>
          <div
            style={{
              marginLeft: "30px",
            }}
          >
            <Switch
              checked={isAllowAdsChecked}
              onChange={() => setIsAllowAdsChecked(!isAllowAdsChecked)}
              color={isAllowAdsChecked ? "secondary" : "default"}
            ></Switch>
          </div>
        </div>
        <div
          className="flex flex-row flex-start"
          style={{ marginTop: "50px", marginLeft: "100px" }}
        >
          <BusinessIcon
            style={{ marginTop: "5px", marginRight: "10px" }}
          ></BusinessIcon>
          <div
            className="font-bold"
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            Allow additional information sharing with business partners
          </div>
          <div
            style={{
              marginLeft: "30px",
            }}
          >
            <Switch
              checked={isAllowSharingChecked}
              onChange={() => setIsAllowSharingChecked(!isAllowSharingChecked)}
              color={isAllowSharingChecked ? "primary" : "default"}
            ></Switch>
          </div>
        </div>
        <div
          className="flex flex-row flex-start"
          style={{ marginTop: "50px", marginLeft: "100px" }}
        >
          <NotificationsIcon
            style={{ marginTop: "5px", marginRight: "10px" }}
          ></NotificationsIcon>
          <div
            className="font-bold"
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            Push notifications
          </div>
          <div
            style={{
              marginLeft: "30px",
            }}
          >
            <Switch
              checked={isPushChecked}
              onChange={() => setIsPushChecked(!isPushChecked)}
              color={isPushChecked ? "secondary" : "default"}
            ></Switch>
          </div>
        </div>
        <div
          className="flex flex-row flex-start"
          style={{ marginTop: "50px", marginLeft: "100px" }}
        >
          <EmojiEmotionsIcon
            style={{ marginTop: "5px", marginRight: "10px" }}
          ></EmojiEmotionsIcon>
          <div
            className="font-bold"
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            Emoji notifications
          </div>
          <div
            style={{
              marginLeft: "30px",
            }}
          >
            <Switch
              checked={isEmojiChecked}
              onChange={() => setIsEmojiChecked(!isEmojiChecked)}
              color={isEmojiChecked ? "primary" : "default"}
            ></Switch>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Setting;
