const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Notification = require('../models/Notification');

// Route to send a friend request
router.post('/api/friendsRequest/sendRequest', async (req, res) => {
    try {
        const { senderid, receiverid } = req.body;

        // Check if the sender is the receiver (self-request)
        if (senderid === receiverid) {
            return res.status(400).json({ error: 'You cannot send a friend request to yourself' });
        }

        // Check if the sender and receiver exist
        const sender = await User.findById(senderid);
        const receiver = await User.findById(receiverid);
        if (!sender || !receiver) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Check if the sender has already sent a request to the receiver
        const existingRequest = await Notification.findOne({ sender: senderid, receiver: receiverid, type: 'friendRequest' });
        if (existingRequest) {
            return res.status(400).json({ error: 'Request already sent' });
        }

        // Create a new friend request notification
        const friendRequest = new Notification({
            sender: sender._id,
            receiver: receiver._id,
            type: 'friendRequest',
        });

        // Save the friend request notification
        const savedRequest = await friendRequest.save();
        res.status(201).json(savedRequest);
    } catch (error) {
        console.error('Error sending friend request:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Route to get friend requests for a specific user
router.get('/api/friendsRequest/getRequests', async (req, res) => {
    try {
        const userid = req.query.userid;

        // Check if the user exists
        const user = await User.findById(userid);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Get all friend requests where the user is the receiver
        const friendRequests = await Notification.find({
            receiver: userid,
            type: 'friendRequest'
        }).populate('sender', 'username avatar'); // Optionally populate sender details

        res.status(200).json(friendRequests);
    } catch (error) {
        console.error('Error fetching friend requests:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

router.get('/api/friendsRequest/checkRequest', async (req, res) => {
    try {
        const { senderid, receiverid } = req.query;

        // Check if the sender and receiver exist
        const sender = await User.findById(senderid);
        const receiver = await User.findById(receiverid);
        if (!sender || !receiver) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Check if already being friends
        if (sender.friends.includes(receiverid) || receiver.friends.includes(senderid)) {
            return res.status(200).json({ requestSent: false , reverse: false , friend: true});
        }

        // Check if the sender has already sent a request to the receiver
        const existingRequest = await Notification.findOne({ sender: senderid, receiver: receiverid, type: 'friendRequest' });
        if (existingRequest) {
            return res.status(200).json({ requestSent: true , reverse: false , friend: false});
        }

        const reverseRequest = await Notification.findOne({ sender: receiverid, receiver: senderid, type: 'friendRequest' });
        if (reverseRequest) {
            return res.status(200).json({ requestSent: false , reverse: true , friend: false});
        }
        console.log("called")
        res.status(200).json({ requestSent: false , reverse: false , friend: false});
    } catch (error) {
        console.error('Error checking friend request:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

router.post('/api/friendsRequest/acceptRequest', async (req, res) => {
    try {
        const {senderid, receiverid } = req.body;

        // Check if the sender and receiver exist
        const sender = await User.findById(senderid);
        const receiver = await User.findById(receiverid);
        if (!sender || !receiver) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Check if the sender has already sent a request to the receiver
        const existingRequest = await Notification.findOne({ sender: senderid, receiver: receiverid, type: 'friendRequest' });
        if (!existingRequest) {
            return res.status(400).json({ error: 'Request not found' });
        }

        // Add each user to the other's friends list
        sender.friends.push(receiverid);
        receiver.friends.push(senderid);

        // Remove the friend request notification
        await existingRequest.remove();

        // Save the updated users
        await sender.save();
        await receiver.save();

        res.status(200).json({ message: 'Friend request accepted' });
    } catch (error) {
        console.error('Error accepting friend request:', error);
        res.status(500).json({ error: 'Server error' });
    }   
});

module.exports = router;