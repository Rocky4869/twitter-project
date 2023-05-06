import { useParams, useNavigate } from "react-router-dom";
import Widgets from "./Widgets";
import "./App.css";
import { useEffect, useState } from "react";
import db from "./firebase";
import SideBarContainer from "./sidebar/SideBarContainer";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Avatar, Button } from "@material-ui/core";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import firebase from "firebase/app";
import Post from "./Post";
import Flipmove from "react-flip-move";

function Profile() {
  let { userid } = useParams();
  const [userData, setUserData] = useState(null); //target user all data
  const [targetUserId, settargetUserId] = useState(null); //target user, primary key in database
  const [uid, setUid] = useState(null); //myself (loggedin user) primary key
  const [loggedInUserData, setLoggedInUserData] = useState(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const [posts, setPosts] = useState([]);
  let navigate = useNavigate();

  const fetchUserData = async () => {
    const collectionRef = db.collection("users"); //get all users
    try {
      const querySnapshot = await collectionRef.where("id", "==", userid).get();
      if (!querySnapshot.empty) {
        const doc = querySnapshot.docs[0];
        settargetUserId(doc.id);
        setUserData(doc.data());
      } else {
        console.log("User not found");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };
  const fetchLoggedInUserData = async () => {
    //fetch logged in user data
    if (uid) {
      const loggedInUserDocRef = db.collection("users").doc(uid); //get logged in user data
      try {
        const loggedInUserDocSnapshot = await loggedInUserDocRef.get();
        if (loggedInUserDocSnapshot.exists) {
          setLoggedInUserData(loggedInUserDocSnapshot.data());
        }
      } catch (error) {
        console.error("Error fetching logged-in user data:", error);
      }
    }
  };

  const fetchPosts = async () => {
    //fetch posts tweet by target user
    try {
      const querySnapshot = await db
        .collection("posts")
        .where("userId", "==", targetUserId)
        .orderBy("created_at", "desc")
        .get();

      const userPosts = querySnapshot.docs.map((doc) => ({
        // get user posts
        id: doc.id,
        data: doc.data(),
      }));

      setPosts(userPosts);
    } catch (error) {
      console.error("Error fetching posts:", error); //error handling
    }
  };

  useEffect(() => {
    //check if logged in
    fetchUserData();
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUid(user.uid);
      } else {
        setUid(null);
        navigate("/");
      }
    });
    return () => {
      unsubscribe(); //clean up
    };
  }, [userid]);

  useEffect(() => {
    fetchLoggedInUserData(); //fetch logged in user data
  }, [uid]);

  useEffect(() => {
    if (loggedInUserData && userData) {
      setIsFollowing(loggedInUserData.Following.includes(targetUserId)); //already exsits in logged in user Following list?
      fetchPosts();
    }
  }, [loggedInUserData, userData, targetUserId]);

  //update db when follow or unfollow
  const updateFollowing = async () => {
    if (uid && targetUserId) {
      const loggedInUserDocRef = db.collection("users").doc(uid);
      const targetUserDocRef = db.collection("users").doc(targetUserId);

      try {
        const batch = db.batch();
        if (isFollowing) {
          // Remove the target user from the Following
          batch.update(loggedInUserDocRef, {
            Following: firebase.firestore.FieldValue.arrayRemove(targetUserId),
          });
          // Remove the logged-in user from the target user's Followers
          batch.update(targetUserDocRef, {
            Followers: firebase.firestore.FieldValue.arrayRemove(uid),
          });
          setUserData((prevUserData) => ({
            ...prevUserData,
            Followers: prevUserData.Followers.filter((id) => id !== uid),
          }));
        } else {
          // Add the target user to the Following
          batch.update(loggedInUserDocRef, {
            Following: firebase.firestore.FieldValue.arrayUnion(targetUserId),
          });
          // Add the logged-in user to the target user's Followers
          batch.update(targetUserDocRef, {
            Followers: firebase.firestore.FieldValue.arrayUnion(uid),
          });
          setUserData((prevUserData) => ({
            ...prevUserData,
            Followers: [...prevUserData.Followers, uid],
          }));
        }

        await batch.commit();
      } catch (error) {
        console.error("Error updating following and followers:", error);
      }
    }
  };

  const handleFollow = async () => {
    //follow or unfollow
    await updateFollowing();
    setIsFollowing(!isFollowing);
  };

  const handleReturn = () => {
    //return to home page
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
                    // src="https://dep.com.vn/wp-content/uploads/2022/11/phong-cach-thoi-trang-cha-eun-woo-1.jpg"
                    src={userData.avator}
                  />
                  <div className="flex flex-row">
                    <div className="font-bold" style={{ marginTop: "10px" }}>
                      {userData.username}
                    </div>
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
                    <div>{userData.introduction}</div>
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
                        marginLeft: "400px",
                      }}
                      onClick={handleFollow}
                    >
                      {isFollowing ? "Following" : "Follow"}
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
                      {userData.joinedAt.toDate().toLocaleString("en-US")}
                    </span>
                  </div>
                  <div
                    className="flex flex-row font-bold"
                    style={{
                      marginTop: "20px",
                    }}
                  >
                    <div style={{ marginRight: "10px" }}>
                      {userData.Following.length} Following
                    </div>
                    <div style={{ marginLeft: "10px" }}>
                      {" "}
                      {userData.Followers.length} Followers{" "}
                    </div>
                  </div>
                </div>
              </div>
              <Flipmove>
                {posts.map((post) => (
                  <Post
                    key={post.id}
                    id={post.data.id}
                    loggedInUserData={loggedInUserData}
                    displayName={post.data.displayName}
                    username={post.data.displayId}
                    verified={false}
                    text={post.data.text}
                    avatar={post.data.avatar}
                    image={post.data.image}
                    likes={post.data.likes}
                    createdAt={post.data.created_at}
                    postId={post.data.postId}
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

export default Profile;
