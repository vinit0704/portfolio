const express = require('express');
const router  = express.Router();
const { auth, isAdmin } = require('../middleware/auth');
const Skill   = require('../models/Skill');
const Project = require('../models/Project');
const Contact = require('../models/Contact');

router.get('/stats', auth, isAdmin, async (req, res) => {
  try {
    const [totalSkills, totalProjects, totalContacts, newContacts, featuredProjects,
           recentProjects, recentContacts] = await Promise.all([
      Skill.countDocuments(),
      Project.countDocuments(),
      Contact.countDocuments(),
      Contact.countDocuments({ status: 'new' }),
      Project.countDocuments({ featured: true }),
      Project.find().sort({ createdAt: -1 }).limit(5),
      Contact.find().sort({ createdAt: -1 }).limit(5)
    ]);
    res.json({
      overview: { totalSkills, totalProjects, totalContacts, newContacts, featuredProjects },
      recentProjects,
      recentContacts
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;