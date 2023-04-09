import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@material-ui/core";

function ForgotPassword() {
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
              Forgot password
            </div>
            <div className="mt-36 flex flex-col justify-center text-center">
              <div>Please enter your account email address and we will</div>
              <div>send you a password reset link</div>
            </div>
            <div className="flex justify-center mt-12">
              <input
                type="text"
                placeholder="Email"
                className="border-2 rounded-sm mt-24 py-12 px-12"
                style={{
                  border: "1px solid #C4C4C4",
                  boxShadow: "2px solid rgba(0, 0, 0, 0.2)",
                  width: "600px",
                }}
              />
            </div>
            <div className="flex justify-center mt-64">
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
                Submit
              </Button>
            </div>
            <div className="flex justify-center mt-36">
              <Link
                type="submit"
                className="border-2 bg-black hover:bg-gray-800 rounded-16 text-center px-8 py-8 font-bold text-xs text-white no-underline"
                style={{
                  border: "1px solid #C4C4C4",
                  boxShadow: "2px solid rgba(0, 0, 0, 0.2)",
                  width: "200px",
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

export default ForgotPassword;
