const express = require('express');
const router = express.Router();

const { addCandidate, updateCandidates, deleteCandidate,voteCandidate,getVoteCount,listCandidates } = require('../controller/candidateController');
const isLoggedIn = require('../middleware/auth.middleware');

// Routes
router.post('/candidateRegister',isLoggedIn,addCandidate);
router.put('/:candidateId',isLoggedIn,updateCandidates);
router.delete('/:candidateId',isLoggedIn,deleteCandidate);
router.post('/vote/:candidateId',isLoggedIn,voteCandidate);
router.get('/vote/count',getVoteCount);
router.get('/candidateslist',listCandidates);

module.exports = router;
