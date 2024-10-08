const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.get('/api/getUser', async (req, res) => {
    const userid = req.query.userid;
    try {
        // Find the user and populate the 'friends' field
        const user = await User.findOne({ _id: userid }).populate('friends', 'username avatar');
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ avatar: '', message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;