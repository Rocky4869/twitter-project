import React, { useState } from "react";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@material-ui/core";
import db from "../firebase";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import LoginHeader from "./LoginHeader";
import LoginFooter from "./LoginFooter";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function RegistrationTab() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatpassword, setRepeatPassword] = useState("");
  const [username, setUsername] = useState("");
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (username.includes("@") || username.includes(" ")) {
      toast.error("Username cannot contain '@' or whitespace!");
      return;
    }
    try {
      //check if username already used
      const usernameSnapshot = await db
        .collection("users")
        .where("username", "==", username)
        .get();

      if (!usernameSnapshot.empty) {
        toast.error("Username already exists. Please choose another one.");
        return;
      }
    } catch (error) {
      console.error("Error checking for existing username:", error);
      return;
    }
    if (password !== repeatpassword) {
      toast.error("Incorrect password!");
      setPassword("");
      setRepeatPassword("");
      return;
    }
    if (password.length < 6) {
      toast.error("Password should be at least 6 characters!");
      // Display an error message to the user
      return;
    }
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      //regrex checking, if invalid
      // document.querySelector("#new-email").classList.add("is-invalid");
      toast.error("Wrong format of Email!");
      console.debug(123)
      return;
    }
    try {
      const userCredential = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);
      const user = userCredential.user;
      const querySnapshot = await db.collection("users").get();
      const userCount = querySnapshot.size;
      // console.log(userCount);
      // assign unique default id
      let defaultUserId;
      let isUnique = false;
      while (!isUnique) {
        defaultUserId = "user" + (userCount + 1);

        const existingUserSnapshot = await db
          .collection("users")
          .where("userid", "==", defaultUserId)
          .get();

        if (existingUserSnapshot.empty) {
          isUnique = true;
        } else {
          userCount++;
        }
      }

      // console.log(defaultUserId);
      // Save the username to Firestore
      const timestamp = firebase.firestore.Timestamp.now();
      await db.collection("users").doc(user.uid).set({
        email,
        username,
        id: defaultUserId,
        Followers: [],
        Following: [],
        joinedAt: timestamp,
        introduction: "Hi there!, I am using twitter!",
        avator: "",
        postLiked: [],
        role:"user,"
      });

      // console.log("User signed up:", user);
      toast.success("You have successfully signed up!");

      navigate("/");
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        toast.error("The email address is already in use by another account!");
      } else {
        toast.error("Error signing up!");
        console.error("Error signing up:", error);
      }
    }
  };

  return (
    <>
      <LoginHeader />
      <div className="bg-blue-300">
        <div className="flex justify-center">
          <div
            className="bg-white flex justify-center border-radius"
            style={{
              width: "700px",
              height: "800px",
              border: "1px solid #000000",
              marginTop: "80px",
              marginBottom: "50px",
              boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
            }}
          >
            <div>
              <div className="flex justify-center">
                <img
                  src="https://img.icons8.com/color/452/twitter--v1.png"
                  alt="twitter"
                  style={{
                    marginTop: "40px",
                    marginTop: "40px",
                    marginBottom: "40px",
                    width: "100px",
                    height: "100px",
                  }}
                ></img>
              </div>
              <div
                style={{
                  letterSpacing: "0.02em",
                  fontSize: "30px",
                }}
                className="text-center font-bold text-black"
              >
                Creat an account
              </div>
              <div className="flex justify-center">
                <input
                  type="text"
                  placeholder="Username"
                  className="border-2"
                  onChange={(e) => setUsername(e.target.value)}
                  value={username}
                  style={{
                    border: "1px solid #C4C4C4",
                    boxShadow: "2px solid rgba(0, 0, 0, 0.2)",
                    width: "450px",
                    marginTop: "40px",
                    padding: "16px",
                    borderRadius: "10px",
                  }}
                />
              </div>
              <div className="flex justify-center">
                <input
                  type="text"
                  placeholder="Email"
                  className="border-2"
                  id="new-email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  style={{
                    border: "1px solid #C4C4C4",
                    boxShadow: "2px solid rgba(0, 0, 0, 0.2)",
                    width: "450px",
                    marginTop: "30px",
                    padding: "16px",
                    borderRadius: "10px",
                  }}
                />
              </div>
              <div className="flex justify-center">
                <input
                  type="password"
                  placeholder="Password"
                  className="border-2"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  style={{
                    border: "1px solid #C4C4C4",
                    boxShadow: "2px solid rgba(0, 0, 0, 0.2)",
                    width: "450px",
                    marginTop: "30px",
                    padding: "16px",
                    borderRadius: "10px",
                  }}
                />
              </div>
              <div className="flex justify-center">
                <input
                  type="password"
                  placeholder="Confirm Password"
                  onChange={(e) => setRepeatPassword(e.target.value)}
                  value={repeatpassword}
                  className="border-2"
                  style={{
                    border: "1px solid #C4C4C4",
                    boxShadow: "2px solid rgba(0, 0, 0, 0.2)",
                    width: "450px",
                    marginTop: "30px",
                    padding: "16px",
                    borderRadius: "10px",
                  }}
                />
              </div>
              <div className="flex justify-center">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSubmit}
                  style={{
                    border: "1px solid #C4C4C4",
                    boxShadow: "2px solid rgba(0, 0, 0, 0.2)",
                    width: "400px",
                    borderRadius: "30px",
                    padding: "10px",
                    marginTop: "40px",
                  }}
                >
                  Register
                </Button>
              </div>
              <div>
                <Link
                  className="text-center text-black flex justify-center no-underline hover:underline"
                  to="/"
                  style={{
                    marginTop: "40px",
                    fontSize: "20px",
                  }}
                >
                  Already have an account? Log in
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <LoginFooter />
    </>
  );
}

export default RegistrationTab;
