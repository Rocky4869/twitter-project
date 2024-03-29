/*

Documentation by ChatGPT (modified):

The ForgotPassword component is a React functional component that renders a form for users to reset their password. 
It imports several dependencies including React, useState, Link, Button, and firebase. The component uses the useState hook to manage the state of the email input field, error message, and success message.

The handleForgotPassword function is called when the user clicks the submit button. 
It uses the Firebase sendPasswordResetEmail method to send a password reset email to the user's email address. 
If the email is sent successfully, the success message is displayed and a success toast notification is shown using the react-toastify library. 
If there is an error, the error message is displayed.

The component renders a form with an email input field and a submit button. 
It also includes a back button that links back to the login page. 
The component also includes a header and footer component that are imported from separate files. 
The styling for the component is done using CSS and the Material UI library.

*/
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import "../css/ForgotPassword.css";
import LoginHeader from "./LoginHeader";
import LoginFooter from "./LoginFooter";
import "firebase/auth";
import "firebase/firestore";
import firebase from "firebase/app";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleForgotPassword = (event) => {
    // handle forgot password
    event.preventDefault();
    firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        setSuccessMessage("Password reset email sent!"); // if password reset email sent, set success message
        toast.success("Password reset email sent successfully!");
        setError(null);
      })
      .catch((error) => {
        setError(error.message); // if error, set error message
        setSuccessMessage(null);
      });
  };

  return (
    <>
      <LoginHeader />
      <div className="bg-blue-300">
        <div className="flex justify-center">
          <div
            className="bg-white flex justify-center"
            style={{
              width: "700px",
              height: "800px",
              border: "1px solid #000000",
              marginTop: "80px",
              marginBottom: "50px",
              boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
              borderRadius: "30px",
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
                className="text-center font-bold text-black"
              >
                Forgot password
              </div>
              <div
                className="flex justify-center text-center text-black"
                style={{
                  marginTop: "50px",
                  fontSize: "15px",
                }}
              >
                Please enter your account email address and we will
              </div>
              <div
                className="flex justify-center text-center text-black"
                style={{
                  marginTop: "10px",
                  fontSize: "15px",
                }}
              >
                send you a password reset link
              </div>
              <div className="flex justify-center">
                <input
                  type="text"
                  placeholder="Email"
                  style={{
                    border: "1px solid #C4C4C4",
                    boxShadow: "2px solid rgba(0, 0, 0, 0.2)",
                    width: "400px",
                    marginTop: "40px",
                    padding: "16px",
                    borderRadius: "10px",
                  }}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="flex justify-center">
                <Button
                  variant="contained"
                  color="primary"
                  className="text-center font-bold text-white"
                  style={{
                    border: "1px solid #C4C4C4",
                    boxShadow: "2px solid rgba(0, 0, 0, 0.2)",
                    width: "400px",
                    borderRadius: "30px",
                    padding: "10px",
                    marginTop: "100px",
                  }}
                  onClick={handleForgotPassword}
                >
                  Submit
                </Button>
              </div>
              <div className="flex justify-center">
                <Link
                  className="text-center font-bold no-underline gray"
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
                  to="/"
                >
                  Back
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

export default ForgotPassword;
