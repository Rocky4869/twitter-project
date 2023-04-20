import { useParams, useNavigate } from "react-router-dom";
import Widgets from "./Widgets";
import "./App.css";
import { useEffect, useState } from "react";
import db from "./firebase";
import SideBarContainer from "./sidebar/SideBarContainer";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import firebase from "firebase/app";
import Flipmove from "react-flip-move";
import Post from "./Post";

function ViewAllTweets() {
  const [posts, setPosts] = useState([]);
  const [uid, setUid] = useState(null);
  const [userData, setUserData] = useState(null);
  let navigate = useNavigate();
  const fetchAllPosts = () => {
    const unsubscribe = db
      .collection("posts")
      .orderBy("created_at", "desc")
      .onSnapshot(
        (snapshot) => {
          const allPosts = snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }));

          setPosts(allPosts);
        },
        (error) => {
          console.error("Error fetching posts:", error);
        }
      );

    return unsubscribe;
  };

  useEffect(() => {
    const unsubscribe = fetchAllPosts();
    return () => {
      unsubscribe();
    };
  }, []);
  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUid(user.uid);
      } else {
        setUid(null);
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
      {posts && (
        <div className="app">
          <SideBarContainer />
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
                  <span style={{ textAlign: "center" }}>All Tweets:</span>
                </div>
              </div>
              <div>
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
                      postId={post.data.postId}
                      // comment_avatar={post.data.comment_avatar}
                      // comment_text={post.data.comment_text}
                      // comment_account={post.data.comment_account}
                    />
                  ))}
                </Flipmove>
              </div>
            </div>
          </div>
          <Widgets />
        </div>
      )}
    </div>
  );
}
export default ViewAllTweets;
