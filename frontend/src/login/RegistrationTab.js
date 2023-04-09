import React from "react";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@material-ui/core";

function RegistrationTab() {
  return (
    <div className="bg-blue-300">
      <div className="flex justify-center">
        <div
          className="bg-white my-48 flex justify-center"
          style={{
            width: "700px",
            height: "839px",
            border: "1px solid #000000",
            boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25);",
            borderRadius: "30px",
          }}
        >
          <div className="mt-12">
            <div className="flex justify-center">
              <img
                src="twitter.png"
                alt="twitter.png"
                className="w-36 h-36 my-12"
              ></img>
            </div>
            <div
              style={{
                letterSpacing: "letter-spacing: -0.02em",
              }}
              className="text-center text-xl font-bold text-black"
            >
              Creat an account
            </div>
            <div className="flex justify-center">
              <input
                type="text"
                placeholder="Username"
                className="border-2 rounded-sm mt-24 py-12 px-12"
                style={{
                  border: "1px solid #C4C4C4",
                  boxShadow: "2px solid rgba(0, 0, 0, 0.2)",
                  width: "500px",
                }}
              />
            </div>
            <div className="flex justify-center">
              <input
                type="text"
                placeholder="Email"
                className="border-2 rounded-sm mt-24 py-12 px-12"
                style={{
                  border: "1px solid #C4C4C4",
                  boxShadow: "2px solid rgba(0, 0, 0, 0.2)",
                  width: "500px",
                }}
              />
            </div>
            <div className="flex justify-center">
              <input
                type="password"
                placeholder="Password"
                className="border-2 rounded-sm mt-24 py-12 px-12"
                style={{
                  border: "1px solid #C4C4C4",
                  boxShadow: "2px solid rgba(0, 0, 0, 0.2)",
                  width: "500px",
                }}
              />
            </div>
            <div className="flex justify-center">
              <input
                type="password"
                placeholder="Confirm Password"
                className="border-2 rounded-sm mt-24 py-12 px-12"
                style={{
                  border: "1px solid #C4C4C4",
                  boxShadow: "2px solid rgba(0, 0, 0, 0.2)",
                  width: "500px",
                }}
              />
            </div>
            <div className="flex justify-center mt-48">
              <Button
                variant="contained"
                color="primary"
                style={{
                  border: "1px solid #C4C4C4",
                  boxShadow: "2px solid rgba(0, 0, 0, 0.2)",
                  width: "400px",
                  borderRadius: "30px",
                  padding: "10px",
                }}
              >
                Register
              </Button>
            </div>
            <div>
              <Link
                className="mt-24 text-center text-xs text-black flex justify-center no-underline hover:underline"
                to="/login"
              >
                Already have an account? Log in
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegistrationTab;
