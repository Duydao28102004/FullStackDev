const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const User = require('../models/User');
const Reaction = require('../models/Reaction');

// Route to add a reaction to a post
router.post('/api/reactions/react', async (req, res) => {
    try {
        const { userid, postid, type } = req.body;
        // Check if the user exists
        const user = await User.findById(userid);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Check if the post exists
        const post = await Post.findById(postid);
        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }

        // Check if the user has already reacted to this post
        const existingReaction = await Reaction.findOne({ user: userid, post: postid });
        if (existingReaction) {
            // Update the existing reaction
            existingReaction.type = type;
            const updatedReaction = await existingReaction.save();
            return res.status(200).json(updatedReaction);
        }

        // Create a new reaction
        const reaction = new Reaction({
            user: user._id,
            post: post._id,
            type,
        });

        // Save the new reaction and update the post's reaction list
        const savedReaction = await reaction.save();
        post.reactions.push(savedReaction._id);
        await post.save();
        res.status(201).json(savedReaction);
    } catch (error) {
        console.error('Error reacting to post:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Route to get reactions for a specific post
router.get('/api/reactions/getReactions', async (req, res) => {
    try {
        const postid = req.query.postid;

        // Check if the post exists
        const post = await Post.findById(postid);
        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }

        // Get reactions and populate user information
        const reactions = await Reaction.find({ post: post._id }).populate('user');
        res.status(200).json(reactions);
    } catch (error) {
        console.error('Error fetching reactions:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

router.post('/api/reactions/deleteReaction', async (req, res) => {
    try {
        const { userid, postid } = req.body;

        // Check if the user exists
        const user = await User.findById(userid);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Check if the post exists
        const post = await Post.findById(postid);
        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }

        // Check if the user has already reacted to this post
        const existingReaction = await Reaction.findOne({ user: userid, post: postid });
        if (!existingReaction) {
            return res.status(404).json({ error: 'Reaction not found' });
        }

        // Remove the reaction from the post's reactions array
        post.reactions = post.reactions.filter(reactionId => reactionId.toString() !== existingReaction._id.toString());
        await post.save();
        // Delete the reaction
        await existingReaction.deleteOne();
        res.status(204).end();
    } catch (error) {
        console.error('Error deleting reaction:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;