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

router.put('/api/posts/updatePost/:id', async (req, res) => {
    try {
        const { content, images } = req.body;
        const postId = req.params.id;

        // Find the post by its ID and update it
        const updatedPost = await Post.findByIdAndUpdate(
            postId,
            { content, images },
            { new: true } // Return the updated document
        );

        if (!updatedPost) {
            return res.status(404).json({ error: 'Post not found' });
        }

        // Send a response with the updated post data
        res.status(200).json(updatedPost);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

router.delete('/api/posts/deletePost/:id', async (req, res) => {
    try {
        const postId = req.params.id;

        // Find the post by its ID and delete it
        const deletedPost = await Post.findByIdAndDelete(postId);

        if (!deletedPost) {
            return res.status(404).json({ error: 'Post not found' });
        }

        // Also remove the post from the author's posts array
        await User.updateMany(
            { posts: postId },
            { $pull: { posts: postId } }
        );

        // Send a response confirming the deletion
        res.status(200).json({ message: 'Post deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});


module.exports = router;
