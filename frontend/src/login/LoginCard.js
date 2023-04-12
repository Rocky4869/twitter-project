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
      // it is username!
      try {
        const querySnapshot = await db
          .collection("users")
          .where("username", "==", usernameOrEmail)
          .get();
        if (querySnapshot.empty) {
          //can't find user
          toast.error("User Not Found!");
          return;
        }
        const userData = querySnapshot.docs[0].data();
        email = userData.email;
      } catch (error) {
        toast.error("Error fetching user data!");
        console.error("Error fetching user data:", error);
        return;
      }
    }

    try {
      const userCredential = await firebase
        .auth()
        .signInWithEmailAndPassword(email, password);
      const user = userCredential.user;
      // console.log("User logged in:", user.uid);
      // console.log("User logged in:", user.email);
      // console.log("User logged in:", user.displayName);
      // alert("User logged in:", user.uid);
      // localStorage.setItem("uid", user.uid);
      toast.success("Log in successfully!", {
        position: toast.POSITION.TOP_CENTER,
        style: {
          textAlign: "center",
        },
      });
      navigate("/home");
    } catch (error) {
      // console.error("Error logging in:", error);
      toast.error("Username or Email or Eassword Incorrect!");
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
