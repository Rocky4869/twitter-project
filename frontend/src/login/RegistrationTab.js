import React from "react";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
// import { Link, useLocation } from "react-router-dom";
import { Button } from "@material-ui/core";

function RegistrationTab() {
  return (
    <div className="bg-blue-300">
      <div className="flex justify-center">
        <div
          className="bg-white flex justify-center border-radius box-shadow"
          style={{
            width: "700px",
            height: "800px",
            border: "1px solid #000000",
            marginTop: "80px",
            marginBottom: "50px",
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
              }}
              className="text-center font-bold text-black"
              style={{
                fontSize: "30px",
              }}
            >
              Creat an account
            </div>
            <div className="flex justify-center">
              <input
                type="text"
                placeholder="Username"
                className="border-2"
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
                type="password"
                placeholder="Password"
                className="border-2"
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
                type="password"
                placeholder="Confirm Password"
                className="border-2"
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
              <Button
                variant="contained"
                color="primary"
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
              <a
                className="text-center text-black flex justify-center no-underline hover:underline"
                // to="/login"
                style={{
                  marginTop: "40px",
                  fontSize: "20px",
                }}
              >
                Already have an account? Log in
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegistrationTab;
