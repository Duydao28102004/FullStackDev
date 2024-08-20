const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/User');

router.post('/api/register', async (req, res) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        const user = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword
        });
        const savedUser = await user.save();
        res.json(savedUser);
    } catch (err) {
        res.json({message: err});
    }
});

router.post('/api/login', async (req, res) => {
    try {
        const user = await User.findOne({username: req.body.username});
        if (!user) {
            return res.status(401).json({error: 'Username is not exist.'});
        }
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) {
            return res.status(401).json({error: 'Password is incorrect.'});
        }
        res.json({message: 'Login successful.'});
    } catch (err) {
        res.json({message: err});
    }
});

module.exports = router;