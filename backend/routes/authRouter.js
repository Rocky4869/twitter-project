const express = require('express');
const bcrypt = require('bcrypt');
const { User } = require('../models/User.js');

const authRouter = express.Router();

authRouter.post("/signup", async(req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        return res.status(400).send({ 'success': false, 'message': 'Unsatisfied parameters'});
    }
    const user = await User.findOne({ $or: [ {'username' : username}, { 'email' : email}] });
    if (user) {
        return res.status(404).send({ 'success': false, 'message': 'Username or email already existed'});
    };
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
        username: username,
        email: email,
        password: hashedPassword
    });
    await newUser.save();
    res.status(404).send({ 'success': true, 'message': 'Sign up successfully'});
})

authRouter.post('/login', async(req, res) => {
    const { username, email, password } = req.body;
    const user_info = await User.findOne({ 'username': username });
    if (!user_info) {
        return res.status(404).send({ 'success': false, 'message': 'User not signed up' });
    } else {
        const user_match = await bcrypt.compare(password, user_info.password);
        if (user_match) {
            const return_info = {username: username, email: user_info.email, isAdmin: user_info.is_admin };
            return res.send({ 'success': true, 'content': return_info });
        };
    };
    res.status(401).send({ 'success': false, 'message': 'Authorization problem' });
})

module.exports = { authRouter };
