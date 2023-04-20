import React from "react";
import "./css/Retweet.css";
import { forwardRef, useEffect, useState } from "react";
import { Avatar, Button } from "@material-ui/core";
import VerifiedIcon from "@mui/icons-material/Verified";
import MapsUgcOutlinedIcon from "@mui/icons-material/MapsUgcOutlined";
import RepeatIcon from "@material-ui/icons/Repeat";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import PublishIcon from "@material-ui/icons/Publish";
import SidebarOption from "./sidebar/SidebarOption";
import db from "./firebase";

const Retweet = forwardRef(
  (
    {
      id,
      displayName,
      username,
      verified,
      avatar,
      new_likes,
      retweet_id,
      retweet_displayName,
      retweet_username,
      retweet_verified,
      retweet_text,
      retweet_avatar,
      retweet_image,
      retweet_likes,
    },
    ref
  ) => {
    const [isLiked, setIsLiked] = useState(false);

    const likeRetweet = (e) => {
      e.preventDefault();

      db.collection("retweets")
        .doc(id)
        .update({
          new_likes: new_likes + 1,
        });
      setIsLiked((value) => !value);
    };

    const unlikeRetweet = (e) => {
      e.preventDefault();

      db.collection("retweets")
        .doc(id)
        .update({
          new_likes: new_likes - 1,
        });
      setIsLiked((value) => !value);
    };

    let like_button_status;

    if (isLiked) {
      like_button_status = (
        <Button onClick={unlikeRetweet} type="submit">
          <SidebarOption active Icon={FavoriteBorderIcon} text={new_likes} />
        </Button>
      );
    } else {
      like_button_status = (
        <Button onClick={likeRetweet} type="submit">
          <SidebarOption Icon={FavoriteBorderIcon} text={new_likes} />
        </Button>
      );
    }

    return (
      <div className="retweet" ref={ref}>
        <div className="retweet_avator">
          <Avatar
            style={{ height: "100px", width: "100px" }}
            src={avatar}
          ></Avatar>
        </div>
        <div className="retweet_header">
          <div className="retweet_headerText">
            <h3>
              {displayName}{" "}
              <span className="retweet_headerSpecial">
                {verified && (
                  <VerifiedIcon className="retweet_badge"></VerifiedIcon>
                )}
              </span>{" "}
              @{username}
            </h3>
          </div>
          <div className="retweet_headerDescription">
            <p>
              <RepeatIcon /> <b>@{username}</b> has <b>Retweeted</b>
            </p>
          </div>
          <div className="retweet_body">
            <div className="retweet_avator">
              <Avatar
                style={{ height: "100px", width: "100px" }}
                src={retweet_avatar}
              ></Avatar>
            </div>

            <div className="retweet_header">
              <div className="retweet_headerText">
                <h3>
                  {retweet_displayName}{" "}
                  <span className="retweet_headerSpecial">
                    {retweet_verified && (
                      <VerifiedIcon className="retweet_badge"></VerifiedIcon>
                    )}
                  </span>{" "}
                  @{retweet_username} has Tweeted
                </h3>
              </div>
            </div>

            <div className="retweet_headerDescription">
              <p>{retweet_text}</p>
            </div>

            <img src={retweet_image} alt="" />
          </div>
          <br></br>

          <form>
            <div className="retweet_footer">
              <Button
                onClick={() => {
                  alert("Comment");
                }}
              >
                <SidebarOption active Icon={MapsUgcOutlinedIcon} />
              </Button>

              <Button
                onClick={() => {
                  alert("Retweeted");
                }}
                type="submit"
              >
                <SidebarOption active Icon={RepeatIcon} />
              </Button>

              {like_button_status}

              {/*
                <Button 
                onClick={likePost} 
                type="submit"><SidebarOption Icon={FavoriteBorderIcon} text={new_likes} />
                </Button>                
                */}

              <Button
                onClick={() => {
                  alert("Share");
                }}
                type="submit"
              >
                <SidebarOption Icon={PublishIcon} />
              </Button>
            </div>
          </form>
          <div className="retweet_id">
            <h6>Post ID: {id}</h6>
          </div>
        </div>
      </div>
    );
  }
);

export default Retweet;
