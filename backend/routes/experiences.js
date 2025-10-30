const express = require('express');
const Experience = require('../models/Experience');
const router = express.Router();

router.get('/experiences', async (req, res) => {
  try {
    const experiences = await Experience.find();
    res.json(experiences);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/experiences/:id', async (req, res) => {
  try {
    const experience = await Experience.findById(req.params.id);
    if (!experience) return res.status(404).json({ error: 'Experience not found' });
    res.json(experience);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;