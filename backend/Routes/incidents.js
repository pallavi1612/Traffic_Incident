const express = require('express');
const router = express.Router();
const Incident = require('../Models/Incident');

// Report a new incident
router.post('/report', async (req, res) => {
  const { location, cause, severity , date } = req.body;
  
  try {
    const newIncident = new Incident({ location, cause, severity , date });
    await newIncident.save();
    res.status(201).json(newIncident);
  } catch (error) {
    res.status(500).json({ message: 'Error reporting incident', error });
  }
});

// Get incident statistics
router.get('/stats', async (req, res) => {
  try {
    const locationStats = await Incident.aggregate([
      { $group: { _id: '$location', total: { $sum: 1 } } }
    ]);

    const severityStats = await Incident.aggregate([
      { $group: { _id: '$severity', total: { $sum: 1 } } }
    ]);
    const dateStats = await Incident.aggregate([
      { $group: { _id: '$date', total: { $sum: 1 } } }
    ]);

    res.json({ locationStats, severityStats ,dateStats });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching statistics', error });
  }
});

router.get('/card', async (req, res) => {
  try {
    const incidents = await Incident.find();
    res.json(incidents);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching incidents' });
  }
});



module.exports = router;
