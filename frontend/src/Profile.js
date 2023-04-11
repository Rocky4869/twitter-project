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

function Profile() {
  let { userid } = useParams();
  const [userData, setUserData] = useState(null);

  const fetchUserData = async () => {
    const collectionRef = db.collection("users");
    try {
      const querySnapshot = await collectionRef.where("id", ">=", userid).get();
      if (!querySnapshot.empty) {
        const doc = querySnapshot.docs[0];
        setUserData(doc.data());
      } else {
        console.log("User not found");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <div>
      {userData ? (
        <div className="app">
          <SideBarContainer />
          <div>
            <div className="feed">
              <div className="feed_header">
                <div className="flex flex-row">
                  <ArrowBackIcon
                    style={{
                      marginTop: "10px",
                      marginRight: "20px",
                    }}
                  ></ArrowBackIcon>
                  <div
                    className="font-bold flex"
                    style={{ fontSize: "30px", marginTop: "1px" }}
                  >
                    {userid}
                  </div>
                </div>
              </div>
              <div className="tweetBox">
                <div className="tweetBox_input flex flex-col">
                  <Avatar
                    style={{ height: "90px", width: "90px" }}
                    src="https://dep.com.vn/wp-content/uploads/2022/11/phong-cach-thoi-trang-cha-eun-woo-1.jpg"
                  />
                  <div className="font-bold" style={{ marginTop: "10px" }}>
                    Rocky
                  </div>
                  <div
                    style={{
                      color: "gray",
                    }}
                  >
                    @{userid}
                  </div>
                  <div
                    style={{
                      marginTop: "10px",
                    }}
                    className="flex flex-row"
                  >
                    <div>
                      Hey, this is Rocky here! This is my introduction section.
                    </div>
                    <Button
                      variant="outlined"
                      style={{
                        padding: "5px",
                        color: "white",
                        borderRadius: "30px",
                        transition: "background-color 0.2s ease-in-out",
                        fontWeight: "bold",
                        backgroundColor: "black",
                        textTransform: "none",
                        width: "100px",
                        marginLeft: "200px",
                      }}
                    >
                      Follow
                    </Button>
                  </div>
                  <div
                    style={{
                      marginTop: "50px",
                    }}
                  >
                    Joined April 2023
                  </div>
                  <div className="flex flex-row font-bold">
                    <div style={{ marginRight: "10px" }}>Following 0</div>
                    <div style={{ marginLeft: "10px" }}> 200 Followers </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Widgets />
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default Profile;
