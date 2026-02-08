const express = require('express');
const router = express.Router();
const candidateController = require('../controllers/candidateController');
const authMiddleware = require('../middleware/auth');

router.post('/candidates', authMiddleware, candidateController.createCandidate);
router.get('/candidates', authMiddleware, candidateController.getAllCandidates);
router.put('/candidates/:id/status', authMiddleware, candidateController.updateCandidateStatus);
router.delete('/candidates/:id', authMiddleware, candidateController.deleteCandidate);

module.exports = router;
