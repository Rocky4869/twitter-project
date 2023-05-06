/*

Documentation by ChatGPT (modified):

The RegistrationTab component is a React functional component that handles the registration form for new users. 
It imports several dependencies including React, useState, Link, useNavigate, Button, db, firebase, LoginHeader, LoginFooter, and toast.

The component defines several state variables including email, password, repeatpassword, and username using the useState hook. 
It also defines a navigate variable using the useNavigate hook.

The handleSubmit function is an asynchronous function that handles the form submission. 
It first checks if the username contains "@" or whitespace and sets an error message if it does. 
It then checks if the username already exists in the database and sets an error message if it does. 
If the username is unique, it checks if the password and repeat password match and sets an error message if they don't. 
It also checks if the password is at least 6 characters long and sets an error message if it isn't. 
Finally, it checks if the email is in the correct format and sets an error message if it isn't. If all the checks pass, it creates a new user with the email and password using Firebase authentication. 
It then generates a default user ID and creates a new user document in the Firestore database with the user's information. If there are any errors during this process, it sets an error message.

The component returns a JSX template that displays the registration form. 
It includes input fields for the username, email, password, and repeat password, as well as a Register button that triggers the handleSubmit function. 
It also includes a link to the login page for users who already have an account. The component also includes the LoginHeader and LoginFooter components for consistent styling.
*/

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
    // real signup
    e.preventDefault();
    if (username.includes("@") || username.includes(" ")) {
      // if username contains @ or whitespace, set error message
      toast.error("Username cannot contain '@' or whitespace!");
      return;
    }
    try {
      const usernameSnapshot = await db // check if username exists
        .collection("users")
        .where("username", "==", username) // query username from firestore
        .get();

      if (!usernameSnapshot.empty) {
        // if username exists, set error message
        toast.error("Username already exists. Please choose another one.");
        return;
      }
    } catch (error) {
      // if error, set error message
      console.error("Error checking for existing username:", error);
      return;
    }
    if (password !== repeatpassword) {
      // if password and repeat password are not the same, set error message
      toast.error("Incorrect password!");
      setPassword("");
      setRepeatPassword("");
      return;
    }
    if (password.length < 6) {
      toast.error("Password should be at least 6 characters!"); // if password is less than 6 characters, set error message
      return;
    }
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      // if email is not in correct format, set error message
      toast.error("Wrong format of Email!");
      return;
    }
    try {
      const userCredential = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password); // create user with email and password
      const user = userCredential.user;
      const querySnapshot = await db.collection("users").get(); // query all users from firestore
      const userCount = querySnapshot.size;
      let defaultUserId;
      let isUnique = false;
      while (!isUnique) {
        defaultUserId = "user" + (userCount + 1); // generate default user id

        const existingUserSnapshot = await db // check if default user id exists
          .collection("users")
          .where("userid", "==", defaultUserId)
          .get();

        if (existingUserSnapshot.empty) {
          isUnique = true;
        } else {
          userCount++;
        }
      }

      const timestamp = firebase.firestore.Timestamp.now(); // get current timestamp
      await db.collection("users").doc(user.uid).set({
        // create user document in firestore
        email,
        username,
        id: defaultUserId,
        Followers: [],
        Following: [],
        joinedAt: timestamp,
        introduction: "Hi there!, I am using twitter!",
        avator: "",
        postLiked: [],
        role: "user,",
      });

      toast.success("You have successfully signed up!");

      navigate("/"); // redirect to home page
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        // if email is already in use, set error message
        toast.error("The email address is already in use by another account!");
      } else {
        toast.error("Error signing up!"); // if error, set error message
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
