/*
The program have referenced Rafeh Qazi's https://github.com/CleverProgrammers/twitter-clone with modification

Documentation by ChatGPT (modified):

This is a Node.js module that exports an Express Router object called adminRouter. This router contains three routes that handle administrative actions related to user management.

The first route is a POST route that takes in a username in the request body and returns a list of all non-admin users if the authenticated user making the request is an admin. If the authenticated user is not an admin, a 401 Unauthorized status code is returned.

The second route is a DELETE route that takes in a username and a deletedUsername in the request body and deletes the user with the provided deletedUsername if the authenticated user making the request is an admin. If the authenticated user is not an admin, a 401 Unauthorized status code is returned. If no deletedUsername is provided, a 400 Bad Request status code is returned. If the specified deletedUsername cannot be found in the database, a 404 Not Found status code is returned.

The third route is a PATCH route that takes in a username and an updatedUser object in the request body and updates the information of the user with the provided oldUsername in the updatedUser object if the authenticated user making the request is an admin. If the authenticated user is not an admin, a 401 Unauthorized status code is returned. If no updatedUser object is provided, a 400 Bad Request status code is returned. If no oldUsername is provided in the updatedUser object, a 400 Bad Request status code is returned. If no updated information is provided in the updatedUser object, a 400 Bad Request status code is returned. If the specified oldUsername cannot be found in the database, a 404 Not Found status code is returned. If the updatedUser object contains an updatedUsername or an updatedEmail that already exists in the database, a 400 Bad Request status code is returned. The updatedPassword in the updatedUser object is hashed using bcrypt with a salt factor of 10 before being stored in the database. If the update is successful, a success message is returned.
*/

const express = require("express");
const bcrypt = require("bcrypt");
const { User } = require("../models/User.js");

const adminRouter = express.Router();

adminRouter.post("/users", async (req, res) => {
  // fetching all users
  const { username } = req.body;
  const user = await User.findOne({ username: username }); // find user by username
  if (!user || !user.is_admin) {
    return res
      .status(401)
      .send({ success: false, message: "Unauthorized user" }); // if user is not admin, return 401
  } else {
    const allUsers = await User.find({ is_admin: false }).select({
      username: 1,
      email: 1,
    }); // find all users
    return res.send({ success: true, content: allUsers }); // return all users
  }
});

adminRouter.delete("/", async (req, res) => {
  // delete user by username
  const { username, deletedUsername } = req.body;
  const user = await User.findOne({ username: username }); // find user by username
  if (!user || !user.is_admin) {
    return res
      .status(401)
      .send({ success: false, message: "Unauthorized user" }); // if user is not admin, return 401
  } else {
    if (!deletedUsername) {
      return res
        .status(400)
        .send({ success: false, message: "No deleted user provided" }); // if no deleted user provided, return 400
    }
    const d_user = await User.findOneAndDelete({ username: deletedUsername }); // find and delete user
    if (!d_user) {
      return res
        .status(404)
        .send({ success: false, message: "User not found" });
    } else {
      res.send({ success: true, content: "Deleted an user successfully" }); // return success message
    }
  }
});

adminRouter.patch("/", async (req, res) => {
  // update user info by username
  const { username, updatedUser } = req.body;
  const user = await User.findOne({ username: username }); // find user by username
  if (!user || !user.is_admin) {
    return res
      .status(401)
      .send({ success: false, message: "Unauthorized user" }); // if user is not admin, return 401
  } else {
    if (!updatedUser) {
      return res.status(400).send({
        success: false,
        message: "No update user information provided",
      }); // if no updated user provided, return 400
    }
    const { oldUsername, updatedUsername, updatedEmail, updatedPassword } =
      updatedUser;
    if (!oldUsername) {
      return res
        .status(400)
        .send({ success: false, message: "No update user target provided" }); // if no update user target provided, return 400
    }
    if (!updatedUsername && !updatedEmail && !updatedPassword) {
      return res
        .status(400)
        .send({ success: false, message: "No update information provided" }); // if no update information provided, return 400
    }
    const f_user = await User.findOne({ username: oldUsername });
    if (!f_user) {
      return res
        .status(404)
        .send({ success: false, message: "Uesr not found" }); // if user not found, return 404
    }
    const updatedInfo = {};
    if (updatedUsername) {
      updatedInfo.username = updatedUsername; // if updated username provided, add to updatedInfo
    }
    if (updatedEmail) {
      updatedInfo.email = updatedEmail; // if updated email provided, add to updatedInfo
    }
    if (updatedPassword) {
      updatedInfo.password = await bcrypt.hash(updatedPassword, 10); // if updated password provided, add to updatedInfo
    }
    const e_user = await User.findOne({
      $or: [{ username: updatedUsername }, { email: updatedEmail }],
    }); // find user by username or email
    if (e_user) {
      return res
        .status(400)
        .send({ success: false, message: "Existed username or email" }); // if username or email already existed, return 400
    } else {
      const u_user = await User.updateOne(
        // update user information
        { username: oldUsername },
        { $set: updatedInfo }
      );
      res.send({
        success: true,
        content: "Updated user infomation successfully", // return success message
      });
    }
  }
});

module.exports = { adminRouter };
