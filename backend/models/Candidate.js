const mongoose = require('mongoose');

const candidateSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { 
    type: String, 
    required: true,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  },
  phone: { 
    type: String, 
    required: true,
    match: /^[0-9]{10}$/
  },
  jobTitle: { type: String, required: true },
  status: { 
    type: String, 
    enum: ['Pending', 'Reviewed', 'Hired'],
    default: 'Pending'
  },
  resumeLink: { type: String },
  referredBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

module.exports = mongoose.model('Candidate', candidateSchema);
