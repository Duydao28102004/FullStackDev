const express = require('express');
const router = express.Router();
const Group = require('../models/Group');


// Get all pending groups
router.get('/api/admin/getPendingGroups', async (req, res) => {
    try {
      const pendingGroups = await Group.find({ approved: false });
      res.json(pendingGroups);
    } catch (error) {
      res.status(500).send('Server error');
    }
});
  
  // Approve a group
router.post('/api/admin/approveGroup', async (req, res) => {
    const { groupId } = req.body;
    try {
      await Group.findByIdAndUpdate(groupId, { approved: true });
      res.json({ message: 'Group approved successfully' });
    } catch (error) {
      res.status(500).send('Server error');
    }
});
  
  // Reject a group
router.post('/api/admin/rejectGroup', async (req, res) => {
    const { groupId } = req.body;
    try {
      await Group.findByIdAndDelete(groupId);
      res.json({ message: 'Group rejected successfully' });
    } catch (error) {
      res.status(500).send('Server error');
    }
});

module.exports = router;