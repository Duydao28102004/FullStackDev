const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const User = require('../models/User');
const Reaction = require('../models/Reaction');

router.post('/api/reactions/react', async (req, res) => {
    try {
        const { userid, postid, type } = req.body;
        const user = await User.findById(userid);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const post = await Post.findById(postid);
        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }

        const reaction = new Reaction({
            user: user._id,
            post: post._id,
            type,
        });

        const savedReaction = await reaction.save();
        post.reactions.push(savedReaction);
        await post.save();

        res.status(201).json(savedReaction);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

router.get('/api/reactions/getReactions', async (req, res) => {
    try {
        const postid = req.query.postid;
        const post = await Post.findById(postid);
        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }
        const reactions = await Reaction.find({ post: post._id }).populate('user');
        res.status(200).json(reactions);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;