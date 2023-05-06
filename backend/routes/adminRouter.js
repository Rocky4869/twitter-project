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
