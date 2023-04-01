import React, { useState } from "react";

function LoginCard() {
  return (
    <div>
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
              <img src="twitter.png" className="w-80 h-80 my-36"></img>
            </div>
            <div
              style={{
                color: "#506D84",
                letterSpacing: "letter-spacing: -0.02em",
              }}
              className="text-center text-2xl font-bold"
            >
              Welcome Back
            </div>
            <div
              className="border-2 rounded-sm mt-24 py-8 px-8"
              style={{
                border: "1px solid #C4C4C4",
                boxShadow: "2px solid rgba(0, 0, 0, 0.2)",
                color: "#C4C4C4",
                width: "400px",
              }}
            >
              Email or username
            </div>
            <div
              className="border-2 rounded-sm mt-12 py-8 px-8"
              style={{
                border: "1px solid #C4C4C4",
                boxShadow: "2px solid rgba(0, 0, 0, 0.2)",
                color: "#C4C4C4",
                width: "400px",
              }}
            >
              Password
            </div>
            <div className="mt-24 border-2 bg-blue rounded-lg text-center px-8 py-8 font-bold text-xs">
              Log in
            </div>
            <div className="flex flex-row justify-between mt-36 underline text-black">
              <div className="mt-12 text-center text-xs">Forgot Password?</div>
              <div className="mt-12 text-center text-xs">
                Don't have an account?
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginCard;
