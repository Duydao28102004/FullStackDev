const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const User = require('../models/User');

router.post('/api/posts/createPost', async (req, res) => {
    try {
        const { userid, content, images, visibility } = req.body;
        
        // Find the author by their user ID
        const author = await User.findById(userid);
        if (!author) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Create a new Post instance with just the author ID
        const newPost = new Post({
            author: author._id,
            content,
            images, // Array of Base64 strings
            visibility,
            comments: [],
            reactions: [],
        });

        // Save the post to the database
        const savedPost = await newPost.save();

        // Add the post to the author's posts array and save the author
        author.posts.push(savedPost);
        await author.save();

        // Send a response with the saved post data
        res.status(201).json(savedPost);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

router.get('/api/posts/getPosts', async (req, res) => {
    try {
        const posts = await Post.find().populate('author');
        res.status(200).json(posts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
