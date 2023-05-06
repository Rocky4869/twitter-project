/*
The program have referenced Rafeh Qazi's https://github.com/CleverProgrammers/twitter-clone with modification

Documentation by ChatGPT (modified):

This is a Node.js module that exports an Express Router object called authRouter. This router contains two routes that handle user authentication actions.

The first route is a POST route that takes in a username, email, and password in the request body and creates a new user with the provided information. If any of the required parameters are missing, a 400 Bad Request status code is returned. If a user with the same username or email already exists in the database, a 404 Not Found status code is returned. If the user is created successfully, a success message is returned.

The second route is a POST route that takes in a username, email, and password in the request body and checks if the provided credentials match an existing user in the database. If the username provided does not match any existing user, a 404 Not Found status code is returned. If the password provided does not match the hashed password stored in the database, a 401 Unauthorized status code is returned. If the credentials are valid, the user information including the username, email, and isAdmin fields are returned in the response.
*/

const express = require("express");
const bcrypt = require("bcrypt");
const { User } = require("../models/User.js");

const authRouter = express.Router();

authRouter.post("/signup", async (req, res) => {
  // signup account with username, email, password
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    // check if all parameters are provided
    return res
      .status(400)
      .send({ success: false, message: "Unsatisfied parameters" });
  }
  const user = await User.findOne({
    $or: [{ username: username }, { email: email }],
  }); // check if username or email already existed
  if (user) {
    return res
      .status(404)
      .send({ success: false, message: "Username or email already existed" });
  }
  const hashedPassword = await bcrypt.hash(password, 10); // hash password
  const newUser = new User({
    // create new user
    username: username,
    email: email,
    password: hashedPassword,
  });
  await newUser.save();
  res.status(404).send({ success: true, message: "Sign up successfully" });
});

authRouter.post("/login", async (req, res) => {
  // login in account by username and password
  const { username, email, password } = req.body;
  const user_info = await User.findOne({ username: username }); // find user by username
  if (!user_info) {
    return res
      .status(404)
      .send({ success: false, message: "User not signed up" });
  } else {
    const user_match = await bcrypt.compare(password, user_info.password); // check if password matches
    if (user_match) {
      const return_info = {
        username: username,
        email: user_info.email,
        isAdmin: user_info.is_admin,
      }; // return user info
      return res.send({ success: true, content: return_info });
    }
  }
  res.status(401).send({ success: false, message: "Authorization problem" }); // if password does not match, return 401
});

module.exports = { authRouter };
