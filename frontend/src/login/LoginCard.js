import React, { useEffect } from "react";
// import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import "../css/LoginCard.css";

function LoginCard() {
  return (
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
              <a
                className="no-underline hover:underline text-black"
                // to="/forget_password"
              >
                Forgot Password?
              </a>
              <a
                className="no-underline hover:underline text-black"
                // to="/register"
              >
                Don't have an account?
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginCard;
