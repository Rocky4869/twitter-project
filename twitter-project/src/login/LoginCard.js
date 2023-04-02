import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@material-ui/core";
import "../css/welcome.css";

function LoginCard() {
  return (
    <div className="bg-blue-900">
      <div className="flex justify-center">
        <div
          className="bg-white my-36 flex justify-center"
          style={{
            width: "620px",
            height: "739px",
            border: "1px solid #000000",
            boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25);",
            borderRadius: "30px",
          }}
        >
          <div>
            <div className="flex justify-center">
              <img
                src="twitter.png"
                alt="twitter.png"
                className="w-80 h-80 my-36 animalShake"
              ></img>
            </div>
            <div className="text-center text-2xl font-bold welcome">
              Welcome
            </div>
            <div>
              <input
                type="text"
                placeholder="Email or username"
                className="border-2 rounded-sm mt-24 p-8"
                style={{
                  border: "1px solid #C4C4C4",
                  boxShadow: "2px solid rgba(0, 0, 0, 0.2)",
                  width: "400px",
                }}
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Password"
                className="border-2 rounded-sm my-24 p-8"
                style={{
                  border: "1px solid #C4C4C4",
                  boxShadow: "2px solid rgba(0, 0, 0, 0.2)",
                  width: "400px",
                }}
              />
            </div>

            <Button
              variant="contained"
              color="primary"
              style={{
                border: "1px solid #C4C4C4",
                boxShadow: "2px solid rgba(0, 0, 0, 0.2)",
                width: "400px",
                borderRadius: "30px",
              }}
            >
              Log in
            </Button>
            <div className="flex flex-row justify-between mt-36 underline text-black">
              <a className="mt-12 text-center text-xs">Forgot Password?</a>
              <a className="mt-12 text-center text-xs">
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
