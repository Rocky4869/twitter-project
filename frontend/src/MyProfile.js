import { useParams, useNavigate } from "react-router-dom";
import Widgets from "./Widgets";
import "./App.css";
import { useEffect, useState } from "react";
import db from "./firebase";
import SideBarContainer from "./sidebar/SideBarContainer";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Avatar, Button} from "@material-ui/core";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import firebase from "firebase/app";
import Post from "./Post";
import Flipmove from "react-flip-move";

function MyProfile() {
  // let { userid } = useParams();
  const [userData, setUserData] = useState(null);
  const [uid, setUid] = useState(null);
  let navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  //fetch posts tweet by logged in user
  const fetchPosts = async () => {
    try {
      const querySnapshot = await db
        .collection('posts')
        .where('userId', '==', uid)
        .orderBy("created_at", "desc")
        .get();

      const userPosts = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        data: doc.data(),
      }));

      setPosts(userPosts);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };
  useEffect(() => {
    if (uid) {
      fetchPosts();
    }
  }, [uid]);

  useEffect(() => {
    const fetchUserData = async (uid) => {
      try {
        const docRef = db.collection("users").doc(uid);
        const docSnapshot = await docRef.get();
        if (docSnapshot.exists) {
          const userData = docSnapshot.data();
          setUserData(userData);
        } else {
          console.log("User not found");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUid(user.uid);
        fetchUserData(user.uid);
      } else {
        setUid(null);
        setUserData(null); // Clear the user data when the user is logged out
        navigate("/");
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const handleReturn = () => {
    navigate("/home");
  };

  return (
    <div>
      {uid && userData ? (
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
                    onClick={handleReturn}
                  ></ArrowBackIcon>
                  <div
                    className="font-bold flex"
                    style={{ fontSize: "30px", marginTop: "1px" }}
                  >
                   {userData.username}
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
                    {userData.username}
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
                        width: "125px",
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
                    @{userData.id}
                  </div>
                  <div
                    style={{
                      marginTop: "10px",
                    }}
                    className="flex flex-row"
                  >
                    <div>
                      {userData.introduction}
                    </div>
                    {/* <Button
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
                    {/* </Button> */}
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
                      {userData.joinedAt.toDate().toLocaleString('en-US')}
                    </span>
                  </div>
                  <div
                    className="flex flex-row font-bold"
                    style={{
                      marginTop: "20px",
                    }}
                  >
                    <div style={{ marginRight: "10px" }}>{userData.Following.length} Following</div>
                    <div style={{ marginLeft: "10px" }}> {userData.Followers.length} Followers</div>
                  </div>
                </div>
              </div>
              {/* inside feed */}
              <Flipmove>
                {posts.map((post) => (
                  <Post
                    key={post.id}
                    id={post.data.id}
                    displayName={post.data.displayName}
                    username={post.data.displayId}
                    verified={post.data.verified}
                    text={post.data.text}
                    avatar={post.data.avatar}
                    image={post.data.image}
                    likes={post.data.likes}
                    createdAt={post.data.created_at}
                    // comment_avatar={post.data.comment_avatar}
                    // comment_text={post.data.comment_text}
                    // comment_account={post.data.comment_account}
                  />
                ))}
              </Flipmove>
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

export default MyProfile;
