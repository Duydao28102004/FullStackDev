const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const User = require('../models/User');
const Group = require('../models/Group');

router.get('/api/search', async (req, res) => {
    try {
        console.log('Search query:', req.query);
        const { query } = req.query;

        // Search for users, posts, and groups based on the query
        const users = await User.find({ username: { $regex: query, $options: 'i' } });
        const posts = await Post.find({ content: { $regex: query, $options: 'i' } }).populate('author', 'username avatar');
        const groups = await Group.find({ name: { $regex: query, $options: 'i' } });

        res.status(200).json({ users, posts, groups });
    } catch (error) {
        console.error('Error searching:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;