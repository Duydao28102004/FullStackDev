const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.get('/api/getAvatar', async (req, res) => {
    const username = req.query.username;

    try {
        const user = await User.findOne({ username: username });
        if (user) {
            res.json({ avatar: user.avatar });
        } else {
            res.status(404).json({ avatar: '', message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;