const express = require('express');
const router = express.Router();
const Comment = require('../models/Comment');
const User = require('../models/User');
const Post = require('../models/Post');

router.post('/api/comment/addComment', async (req, res) => {
    try {
        const { userid, postid, content } = req.body;

        // Find the author by their user ID
        const author = await User.findById(userid);
        if (!author) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Find the post by its ID
        const post = await Post.findById(postid);
        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }

        // Create a new Comment instance
        const newComment = new Comment({
            author: userid,
            post: postid,
            content: content
        });

        // Save the comment to the database
        const savedComment = await newComment.save();

        // Add the comment to the post's comments array
        post.comments.push(savedComment._id);
        await post.save();

        // Optionally populate the comment with author details before sending the response
        const populatedComment = await Comment.findById(savedComment._id).populate('author');

        // Send a success response with the saved comment
        res.status(201).json({ comment: populatedComment });

    } catch (error) {
        console.error('Error adding comment:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Route to get comments for a specific post
router.get('/api/comments/:postId', async (req, res) => {
    try {
        const { postId } = req.params;


        // Find the post by its ID
        const post = await Post.findById(postId).populate('comments');
        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }

        // Find comments for the post and populate author details
        const comments = await Comment.find({ post: postId }).populate('author');

        // Send the comments back to the client
        res.json(comments);
    } catch (error) {
        console.error('Error fetching comments:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Delete Comment
router.delete('/api/comment/deleteComment/:commentId', async (req, res) => {
    try {
        const { commentId } = req.params;

        // Find the comment by its ID
        const comment = await Comment.findById(commentId);
        if (!comment) {
            return res.status(404).json({ error: 'Comment not found' });
        }

        // Remove the comment from the associated post's comments array
        await Post.updateOne(
            { comments: commentId },
            { $pull: { comments: commentId } }
        );

        // Delete the comment from the database
        await Comment.findByIdAndDelete(commentId);

        // Send a success response
        res.status(200).json({ message: 'Comment deleted successfully' });
    } catch (error) {
        console.error('Error deleting comment:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
