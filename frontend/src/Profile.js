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
                    Oscar
                  </div>
                </div>
              </div>
              <div
                style={{
                  paddingBottom: "250px",
                  borderBottom: "1px solid var(--twitter-background)",
                }}
              >
                <div
                  style={{
                    backgroundColor: "#FFEBCD",
                    height: "100px",
                    position: "relative",
                  }}
                ></div>
                <div
                  className="flex flex-col"
                  style={{
                    padding: "20px",
                    position: "absolute",
                    top: "100px",
                  }}
                >
                  <Avatar
                    style={{ height: "90px", width: "90px" }}
                    src="https://dep.com.vn/wp-content/uploads/2022/11/phong-cach-thoi-trang-cha-eun-woo-1.jpg"
                  />
                  <div className="flex flex-row">
                    <div className="font-bold" style={{ marginTop: "10px" }}>
                      Oscar
                    </div>
                    <Button
                      variant="outlined"
                      style={{
                        padding: "5px",
                        color: "white",
                        borderRadius: "30px",
                        fontWeight: "bold",
                        backgroundColor: "black",
                        textTransform: "none",
                        width: "150px",
                        marginLeft: "500px",
                      }}
                    >
                      Edit Profile
                      {/* show profile if is user himself */}
                    </Button>
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
                      Hey, this is Oscar here! This is my introduction section.
                    </div>
                    <Button
                      variant="outlined"
                      style={{
                        padding: "5px",
                        color: "white",
                        borderRadius: "30px",
                        fontWeight: "bold",
                        backgroundColor: "black",
                        textTransform: "none",
                        width: "100px",
                        marginLeft: "200px",
                      }}

                    >
                      Follow
                      {/* show follow if is not user himself */}
                    </Button>
                  </div>
                  <div
                    style={{
                      marginTop: "20px",
                    }}
                    className="flex flex-row"
                  >
                    <CalendarMonthIcon
                      style={{
                        marginRight: "5px",
                      }}
                    ></CalendarMonthIcon>
                    <span
                      style={{
                        marginTop: "5px",
                      }}
                    >
                      Joined April 2023
                    </span>
                  </div>
                  <div
                    className="flex flex-row font-bold"
                    style={{
                      marginTop: "20px",
                    }}
                  >
                    <div style={{ marginRight: "10px" }}>9 Following</div>
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
