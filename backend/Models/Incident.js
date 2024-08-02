const mongoose = require('mongoose');

const incidentSchema = new mongoose.Schema({
  location: { type: String, required: true },
  cause: { type: String, required: true },
  severity: { type: String, enum: ['minor', 'moderate', 'severe'], required: true },
  date: { type: Date, default: Date.now },
});

const Incident = mongoose.model('Incident', incidentSchema);

module.exports = Incident;
