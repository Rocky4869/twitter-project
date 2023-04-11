import React, {useState} from "react";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@material-ui/core";
import db from "../firebase";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
function RegistrationTab() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatpassword, setRepeatPassword] = useState("");
  const [username, setUsername] = useState("");
  let navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if(password !== repeatpassword){
      alert("Incorrect password!");
      setPassword("");
      setRepeatPassword("");
      return;
    }
    if (password.length < 6) {
      alert("Error signing up: Password should be at least 6 characters");
      // Display an error message to the user
      return;
    }
    if(!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))){ //regrex checking, if invalid
      // document.querySelector("#new-email").classList.add("is-invalid");
      alert("Wrong format of Email!");
      return;
    }
      try {
        const userCredential = await firebase
          .auth()
          .createUserWithEmailAndPassword(email, password);
        const user = userCredential.user;

        // Save the username to Firestore
        await db.collection("users").doc(user.uid).set({ email, username });

        // console.log("User signed up:", user);
        alert("You have successfully signed up!");
        navigate("/login");
      } catch (error) {
        alert("Error signing up:", error);
      }
    

  };

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
                letterSpacing: "0.02em",
                fontSize: "30px",
              }}
              className="text-center font-bold text-black"
            >
              Creat an account
            </div>
            <div className="flex justify-center">
              <input
                type="text"
                placeholder="Username"
                className="border-2"
                onChange={(e) => setUsername(e.target.value)}
                value={username}
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
                id="new-email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                style={{
                  border: "1px solid #C4C4C4",
                  boxShadow: "2px solid rgba(0, 0, 0, 0.2)",
                  width: "450px",
                  marginTop: "30px",
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
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                style={{
                  border: "1px solid #C4C4C4",
                  boxShadow: "2px solid rgba(0, 0, 0, 0.2)",
                  width: "450px",
                  marginTop: "30px",
                  padding: "16px",
                  borderRadius: "10px",
                }}
              />
            </div>
            <div className="flex justify-center">
              <input
                type="password"
                placeholder="Confirm Password"
                onChange={(e) => setRepeatPassword(e.target.value)}
                value={repeatpassword}
                className="border-2"
                style={{
                  border: "1px solid #C4C4C4",
                  boxShadow: "2px solid rgba(0, 0, 0, 0.2)",
                  width: "450px",
                  marginTop: "30px",
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
                  borderRadius: "30px",
                  padding: "10px",
                  marginTop: "40px",
                }}
              >
                Register
              </Button>
            </div>
            <div>
              <Link
                className="text-center text-black flex justify-center no-underline hover:underline"
                to="/login"
                style={{
                  marginTop: "40px",
                  fontSize: "20px",
                }}
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
