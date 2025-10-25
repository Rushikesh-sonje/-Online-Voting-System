
const candidate = require('../models/candidate');
const user = require('../models/user');
const mongoose = require('mongoose');
const express = require('express');

const AppError = require('../utils/error.utils');





const addCandidate = async (req, res, next) => {
    if (req.user.role !== 'admin') {
        return next(new AppError('Only admins can add candidates', 403));
    }

    try {
        const { name, party, age } = req.body;
        const newCandidate = await candidate.create({ name, party, age });
        res.status(201).json({ message: 'Candidate added successfully', candidate: newCandidate });
    } catch (error) {
        next(new AppError(error.message, 500));
    }
};

const updateCandidates = async (req, res, next) => {
    if (req.user.role !== 'admin') {
        return next(new AppError('Only admins can update candidates', 403));
    }
    try {
        const { candidateId } = req.params;
        const updates = req.body;
        const updatedCandidate = await
            candidate.findByIdAndUpdate(candidateId, updates, { new: true ,runValidators: true});
        if (!updatedCandidate) {
            return next(new AppError('Candidate not found', 404));
        }
        res.status(200).json({ message: 'Candidate updated successfully', candidate: updatedCandidate });
    } catch (error) {
        next(new AppError(error.message, 500));
    }
};

const deleteCandidate = async (req, res, next) => {
    if (req.user.role !== 'admin') {
        return next(new AppError('Only admins can delete candidates', 403));
    }
    try {
        const { candidateId } = req.params;
        const deletedCandidate = await
            candidate.findByIdAndDelete(candidateId);
        if (!deletedCandidate) {
            return next(new AppError('Candidate not found', 404));
        }
        res.status(200).json({ message: 'Candidate deleted successfully' });
    } catch (error) {
        next(new AppError(error.message, 500));
    }
};

const voteCandidate = async (req, res, next) => {
    if (req.user.role !== 'voter') {
        return next(new AppError('Only voters can vote for candidates', 403));
    }

    try {
        const { candidateId } = req.params;
        const userId = req.user.id;

        // Find candidate
        const candidateToVote = await candidate.findById(candidateId);
        if (!candidateToVote) {
            return next(new AppError('Candidate not found', 404));
        }

        // Find user
        const userDoc = await user.findById(userId);
        if (!userDoc) {
            return next(new AppError('User not found', 404));
        }

        // ✅ Check if the user already voted (global restriction)
        if (userDoc.isVoted) {
            return res.status(400).json({ message: 'You have already voted' });
        }

        // ✅ Record the vote
        candidateToVote.votes.push({ user: new mongoose.Types.ObjectId(userId) });
        candidateToVote.voteCount += 1;

        // ✅ Save both updates
        await candidateToVote.save();
        userDoc.isVoted = true; // mark user as voted
        await userDoc.save();

        res.status(200).json({ message: 'Vote cast successfully' });

    } catch (error) {
        next(new AppError(error.message, 500));
    }
};

// list of candidates 

const listCandidates = async (req, res, next) => {
    try {
        const candidates = await candidate.find();
        res.status(200).json({ candidates });
    } catch (error) {
        next(new AppError(error.message, 500));
    }
};

// vote count
const getVoteCount = async (req, res, next) => {
    try {
        const candidates = await candidate.find().sort({ voteCount: -1 });


        const voteCounts = candidates.map(cand => ({
            candidateId: cand._id,
            name: cand.name,
            party: cand.party,
            voteCount: cand.voteCount
        }));
        res.status(200).json({ voteCounts });
    } catch (error) {
        next(new AppError(error.message, 500));
    }
};



module.exports = {
    addCandidate,
    updateCandidates,
    deleteCandidate,
    voteCandidate,
    getVoteCount,listCandidates
};




