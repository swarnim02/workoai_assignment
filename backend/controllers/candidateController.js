const Candidate = require('../models/Candidate');

// Role-Based Access Control (RBAC) Implementation:
// - Users can create and view their own referrals
// - Admins can view all referrals, update status, and delete candidates
// - Admins cannot create referrals themselves

exports.createCandidate = async (req, res) => {
  try {
    if (req.user.role === 'admin') {
      return res.status(403).json({ error: 'Admins cannot refer candidates' });
    }

    const { name, email, phone, jobTitle, resumeData, resumeName } = req.body;

    if (!name || !email || !phone || !jobTitle) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const candidate = new Candidate({ 
      name, email, phone, jobTitle, resumeData, resumeName,
      referredBy: req.user.userId
    });
    await candidate.save();
    res.status(201).json(candidate);
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ error: 'Invalid email or phone format' });
    }
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getAllCandidates = async (req, res) => {
  try {
    const query = req.user.role === 'admin' ? {} : { referredBy: req.user.userId };
    const candidates = await Candidate.find(query)
      .populate('referredBy', 'name email')
      .select('-resumeData')
      .sort({ createdAt: -1 });
    res.json(candidates);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.updateCandidateStatus = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Only admins can update status' });
    }

    const { status } = req.body;
    if (!['Pending', 'Reviewed', 'Hired'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }

    const candidate = await Candidate.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    ).select('-resumeData');

    if (!candidate) {
      return res.status(404).json({ error: 'Candidate not found' });
    }
    res.json(candidate);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.deleteCandidate = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Only admins can delete candidates' });
    }

    const candidate = await Candidate.findByIdAndDelete(req.params.id);
    if (!candidate) {
      return res.status(404).json({ error: 'Candidate not found' });
    }
    res.json({ message: 'Candidate deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};
