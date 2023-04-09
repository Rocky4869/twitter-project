const express = require('express');
const bcrypt = require('bcrypt');
const { User } = require('../models/User.js');

const adminRouter = express.Router();

adminRouter.post('/users', async (req, res) => {
    // fetching all users
    const { username } = req.body;
    const user = await User.findOne({ 'username': username });
    if (!user || !user.is_admin) {
    return res.status(401).send({ 'success': false, 'message': 'Unauthorized user' });
    } else {
    const allUsers = await User.find({ 'is_admin': false }).select({ 'username': 1, 'email': 1 });
    return res.send({ 'success': true, 'content': allUsers });
    }
});

adminRouter.delete('/', async (req, res) => {
    // delete user by username
    const { username, deletedUsername } = req.body;
    const user = await User.findOne({ 'username': username });
    if (!user || !user.is_admin) {
    return res.status(401).send({ 'success': false, 'message': 'Unauthorized user' });
    } else {
    if (!deletedUsername) {
        return res.status(400).send({ 'success': false, 'message': 'No deleted user provided' });
    };
    const d_user = await User.findOneAndDelete({ 'username': deletedUsername });
    if (!d_user) {
        return res.status(404).send({ 'success': false, 'message': 'User not found' });
    } else {
        res.send({ 'success': true, 'content': 'Deleted an user successfully' });
    };
    };
});

adminRouter.patch('/', async (req, res) => {
    // update user info by username
    const { username, updatedUser } = req.body;
    const user = await User.findOne({ 'username': username });
    if (!user || !user.is_admin) {
    return res.status(401).send({ 'success': false, 'message': 'Unauthorized user' });
    } else {
    if (!updatedUser) {
        return res.status(400).send({ 'success': false, 'message': 'No update user information provided' })
    }
    const { oldUsername, updatedUsername, updatedEmail, updatedPassword } = updatedUser;
    if (!oldUsername) {
        return res.status(400).send({ 'success': false, 'message': 'No update user target provided' });
    };
    if (!updatedUsername && !updatedEmail && !updatedPassword) {
        return res.status(400).send({ 'success': false, 'message': 'No update information provided' });
    };
    const f_user = await User.findOne({ 'username': oldUsername });
    if (!f_user) {
        return res.status(404).send({ 'success': false, 'message': 'Uesr not found' });
    };
    const updatedInfo = {};
    if (updatedUsername) {
        updatedInfo.username = updatedUsername;
    };
    if (updatedEmail) {
        updatedInfo.email = updatedEmail;
    };
    if (updatedPassword) {
        updatedInfo.password = await bcrypt.hash(updatedPassword, 10);
    };
    const e_user = await User.findOne({ $or: [{ 'username': updatedUsername }, { 'email': updatedEmail }] });
    if (e_user) {
        return res.status(400).send({ 'success': false, 'message': 'Existed username or email' });
    } else {
        const u_user = await User.updateOne({ 'username': oldUsername }, { $set: updatedInfo });
        res.send({ 'success': true, 'content': 'Updated user infomation successfully' });
    }
    };
});

module.exports = { adminRouter };