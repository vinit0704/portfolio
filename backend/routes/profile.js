const express = require('express');
const router = express.Router();
const Profile = require('../models/Profile');
const { auth, isAdmin } = require('../middleware/auth');

// @route   GET /api/profile
// @desc    Get profile data
// @access  Public
router.get('/', async (req, res) => {
  try {
    const profile = await Profile.findOne();
    
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }
    
    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   POST /api/profile
// @desc    Create or update profile
// @access  Private (will add auth later)
router.post('/:id', auth, isAdmin, async (req, res) => {
  try {
    const profile = await Profile.findOne();
    
    if (profile) {
      // Update existing profile
      Object.assign(profile, req.body);
      await profile.save();
      res.json(profile);
    } else {
      // Create new profile
      const newProfile = new Profile(req.body);
      await newProfile.save();
      res.status(201).json(newProfile);
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;