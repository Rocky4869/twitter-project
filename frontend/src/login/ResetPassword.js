import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import "../css/ResetPassword.css";

function ResetPassword() {
  return (
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
                fontSize: "30px",
              }}
              className="text-center font-bold text-black border-radius-30"
            >
              Reset your password
            </div>
            <div className="flex justify-center text-center text-black">
              <div
                style={{
                  fontSize: "15px",
                  marginTop: "30px",
                }}
              >
                Please enter and confirm your new password
              </div>
            </div>
            <div className="flex justify-center">
              <input
                type="text"
                placeholder="New Password"
                style={{
                  border: "1px solid #C4C4C4",
                  boxShadow: "2px solid rgba(0, 0, 0, 0.2)",
                  width: "400px",
                  marginTop: "50px",
                  padding: "16px",
                  borderRadius: "10px",
                }}
              />
            </div>
            <div className="flex justify-center">
              <input
                type="text"
                placeholder="Confirm Password"
                className="border-2 rounded-sm py-12 px-12"
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
            <div className="flex justify-center">
              <Button
                variant="contained"
                color="primary"
                className="focus:bg-blue-900 text-center font-bold text-white"
                style={{
                  border: "1px solid #C4C4C4",
                  boxShadow: "2px solid rgba(0, 0, 0, 0.2)",
                  width: "400px",
                  borderRadius: "30px",
                  padding: "10px",
                  marginTop: "100px",
                }}
              >
                Submit
              </Button>
            </div>
            <div className="flex justify-center">
              <Link
                className="border-2 text-center font-bold no-underline gray"
                style={{
                  border: "1px solid #C4C4C4",
                  boxShadow: "2px solid rgba(0, 0, 0, 0.2)",
                  width: "200px",
                  backgroundColor: "black",
                  padding: "15px",
                  marginTop: "40px",
                  color: "white",
                  borderRadius: "30px",
                  transition: "background-color 0.2s ease-in-out",
                }}
                to="/login"
              >
                Back
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
