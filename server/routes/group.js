const express = require('express');
const router = express.Router();
const Group = require('../models/Group');
const User = require('../models/User');
const Post = require('../models/Post');
const Notification = require('../models/Notification');

router.post('/api/groups/createGroup', async (req, res) => {
    const { name, description, visibility, admin } = req.body;
    try {
        // Check if the admin user exists
        const adminUser = await User.findById(admin);
        if (!adminUser) {
            return res.status(404).json({ message: 'Admin user not found' });
        }
        // Create a new group with the provided data
        const group = new Group({
            name,
            description,
            visibility,
            admins: [admin]
        });
        // Save the group to the database
        adminUser.groups.push(group);
        await group.save();
        res.json(group);
    } catch (error) {
        console.error('Error creating group:', error);
        res.status(500).json({ message: 'Error creating group' });
    }
});

router.get('/api/groups/getGroups', async (req, res) => {
    try {
        const { userid } = req.query;

        // Fetch groups where the user is an admin
        const adminGroups = await Group.find({ admins: userid });

        // Fetch groups where the user is a member but not an admin
        const memberGroups = await Group.find({ 
            members: userid,
            admins: { $ne: userid } // Exclude groups where the user is an admin
        });

        // Respond with both admin and member groups
        res.json({
            adminGroups,
            memberGroups
        });
    } catch (error) {
        console.error('Error getting groups:', error);
        res.status(500).json({ message: 'Error getting groups' });
    }
});

router.get('/api/groups/getGroup', async (req, res) => {
    try {
        const { groupid } = req.query;
        const group = await Group.findById(groupid);
        res.json(group);
    } catch (error) {
        console.error('Error getting group:', error);
        res.status(500).json({ message: 'Error getting group' });
    }
});

router.post('/api/groups/joinGroupRequest', async (req, res) => {
    const { userid, groupid } = req.body;
    try {
        // Check if the user exists
        const user = await User.findById(userid);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        // Check if the group exists
        const group = await Group.findById(groupid);
        if (!group) {
            return res.status(404).json({ message: 'Group not found' });
        }
        // Check if the user is already a member
        if (group.members.includes(userid)) {
            return res.status(400).json({ message: 'User is already a member of this group' });
        }

        // Check if the user has already sent a request
        const existingNotification = await Notification.findOne({ sender: userid, type: 'groupRequest', group: groupid });
        if (existingNotification) {
            return res.status(400).json({ message: 'User has already sent a request to join this group' });
        }


        // Create a new notification for the group request
        const notification = new Notification({
            sender: userid,
            type: 'groupRequest',
            group: groupid
        });
        await notification.save();
        res.json(notification);
    } catch (error) {
        console.error('Error joining group:', error);
        res.status(500).json({ message: 'Error joining group' });
    }
});

router.get('/api/groups/getGroupRequest', async (req, res) => {
    try {
        const { userid } = req.query;
        const { groupid } = req.query;
        const group = await Group.findById(groupid);
        if (group.members.includes(userid)) {
            return res.json({member: true, requestSent: false});
        }
        const notification = await Notification.findOne({ receiver: userid, type: 'groupRequest', group: groupid });
        if (notification) {
            console.log(notifications);
            return res.json({member: false, requestSent: true});
        }
        return res.json({member: false, requestSent: false});
    } catch (error) {
        console.error('Error getting group request:', error);
        res.status(500).json({ message: 'Error getting group request' });
    }
});

router.post('/api/groups/leaveGroup', async (req, res) => {
    const { userid, groupid } = req.body;
    try {
        // Check if the user exists
        const user = await User.findById(userid);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        // Check if the group exists
        const group = await Group.findById(groupid);
        if (!group) {
            return res.status(404).json({ message: 'Group not found' });
        }
        // Check if the user is a member
        if (!group.members.includes(userid)) {
            return res.status(400).json({ message: 'User is not a member of this group' });
        }
        // Remove the user from the group
        group.members.pull(userid);
        await group.save();
        res.json(group);
    } catch (error) {
        console.error('Error leaving group:', error);
        res.status(500).json({ message: 'Error leaving group' });
    }
});

router.post('/api/groups/acceptGroupRequest', async (req, res) => {
    const { senderid, groupid } = req.body;
    try {
        // Check if the sender exists
        const sender = await User.findById(senderid);
        if (!sender) {
            return res.status(404).json({ message: 'Sender not found' });
        }
        // Check if the group exists
        const group = await Group.findById(groupid);
        if (!group) {
            return res.status(404).json({ message: 'Group not found' });
        }
        // Check if the receiver has a pending request
        const notification = await Notification.findOne({ sender: senderid, type: 'groupRequest', group: groupid });
        if (!notification) {
            return res.status(400).json({ message: 'No pending group request found' });
        }
        // Add the receiver to the group
        group.members.push(receiverid);
        await group.save();
        // Remove the notification
        await notification.remove();
        res.json(group);
    } catch (error) {
        console.error('Error accepting group request:', error);
        res.status(500).json({ message: 'Error accepting group request' });
    }
});

router.post('/api/groups/rejectGroupRequest', async (req, res) => {
    const { userid, groupid } = req.body;
    try {
        // Check if the sender exists
        const user = await User.findById(userid);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        // Check if the group exists
        const group = await Group.findById(groupid);
        if (!group) {
            return res.status(404).json({ message: 'Group not found' });
        }
        // Check if the receiver has a pending request
        const notification = await Notification.findOne({ sender: userid, type: 'groupRequest', group: groupid });
        if (!notification) {
            return res.status(400).json({ message: 'No pending group request found' });
        }
        // Remove the notification
        await notification.deleteOne();
        res.json({ message: 'Group request rejected' });
    } catch (error) {
        console.error('Error rejecting group request:', error);
        res.status(500).json({ message: 'Error rejecting group request' });
    }
});
module.exports = router;