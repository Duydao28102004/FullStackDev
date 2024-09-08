const express = require('express');
const router = express.Router();
const Group = require('../models/Group');
const User = require('../models/User');
const Post = require('../models/Post');

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

module.exports = router;