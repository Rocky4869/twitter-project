/*

Documentation by ChatGPT (modified):

The LoginCard component is a React functional component that renders a login form for users to enter their email or username and password to log in to the application. 
It imports several dependencies including React, react-router-dom, @material-ui/core, firebase, and react-toastify.

The component uses the useState hook to manage the state of the usernameOrEmail and password fields. 
It also uses the useNavigate hook from react-router-dom to navigate to the home page after successful login.

The handleSubmit function is called when the user clicks the login button. 
It first checks if the entered value is an email or username and then queries the Firebase database to retrieve the user's email if the entered value is a username. 
It then uses Firebase's signInWithEmailAndPassword method to authenticate the user with their email and password. 
If the authentication is successful, the user is redirected to the home page. If there is an error, a toast message is displayed to the user.

The LoginCard component also renders a header and footer component, LoginHeader and LoginFooter respectively, to provide a consistent layout across the application. 
The login form is styled using CSS classes defined in the LoginCard.css file.

*/

import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@material-ui/core";
import "../css/LoginCard.css";
import db from "../firebase";
import firebase from "firebase/app";
import "firebase/auth";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoginHeader from "./LoginHeader";
import LoginFooter from "./LoginFooter";

function LoginCard() {
  const [usernameOrEmail, setUsernameOrEmail] = useState();
  const [password, setPassword] = useState();
  let navigate = useNavigate();

  // real login
  const handleSubmit = async (e) => {
    e.preventDefault();
    let email = usernameOrEmail;
    if (!usernameOrEmail.includes("@")) {
      // if usernameOrEmail is username, query user data from firestore
      try {
        const querySnapshot = await db // query user data from firestore
          .collection("users")
          .where("username", "==", usernameOrEmail)
          .get();
        if (querySnapshot.empty) {
          toast.error("User Not Found!"); // if user not found, set error message
          return;
        }
        const userData = querySnapshot.docs[0].data(); // get user data
        email = userData.email;
      } catch (error) {
        toast.error("Error fetching user data!"); // if error, set error message
        console.error("Error fetching user data:", error);
        return;
      }
    }

    try {
      const userCredential = await firebase // login with email and password
        .auth()
        .signInWithEmailAndPassword(email, password);
      const user = userCredential.user;
      toast.success("Log in successfully!", {
        // if login successfully, set success message
        position: toast.POSITION.TOP_CENTER,
        style: {
          textAlign: "center",
        },
      });
      navigate("/home");
    } catch (error) {
      toast.error("Username or Email or Password Incorrect!"); // if error, set error message
    }
  };

  return (
    <>
      <LoginHeader />
      <div className="bg-blue-300">
        <div className="flex justify-center">
          <div
            className="bg-white flex justify-center"
            style={{
              width: "620px",
              height: "739px",
              border: "1px solid #000000",
              borderRadius: "30px",
              marginTop: "80px",
              marginBottom: "50px",
              boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
            }}
          >
            <div>
              <div className="flex justify-center">
                <img
                  src="https://img.icons8.com/color/452/twitter--v1.png"
                  alt="twitter-bird"
                  className="animalShake"
                  style={{
                    width: "200px",
                    height: "200px",
                    marginTop: "40px",
                  }}
                ></img>
              </div>
              <div
                className="text-center font-bold welcome"
                style={{
                  fontSize: "40px",
                  marginTop: "20px",
                }}
              >
                Welcome
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Email or username"
                  onChange={(e) => setUsernameOrEmail(e.target.value)}
                  style={{
                    border: "1px solid #C4C4C4",
                    boxShadow: "2px solid rgba(0, 0, 0, 0.2)",
                    width: "400px",
                    marginTop: "40px",
                    padding: "16px",
                    borderRadius: "10px",
                  }}
                />
              </div>
              <div>
                <input
                  type="password"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                  style={{
                    border: "1px solid #C4C4C4",
                    boxShadow: "2px solid rgba(0, 0, 0, 0.2)",
                    width: "400px",
                    marginTop: "20px",
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
                    padding: "10px",
                    marginTop: "80px",
                    borderRadius: "30px",
                  }}
                >
                  Log in
                </Button>
              </div>
              <div
                className="flex justify-between"
                style={{
                  marginTop: "50px",
                }}
              >
                <Link
                  className="no-underline hover:underline text-black"
                  to="/forget_password"
                  style={{
                    fontSize: "20px",
                  }}
                >
                  Forgot Password?
                </Link>
                <Link
                  className="no-underline hover:underline text-black"
                  to="/register"
                  style={{
                    fontSize: "20px",
                  }}
                >
                  Don't have an account?
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

export default LoginCard;
