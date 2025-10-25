const express = require('express');
const router = express.Router();

const { signup, login, logout, getProfile,changePassword } = require('../controller/userController');
const isLoggedIn = require('../middleware/auth.middleware');

// Routes
router.post('/signup', signup);
router.post('/login', login);
router.get('/logout', logout);
router.get('/profile', isLoggedIn, getProfile);
router.put('/profile/password', isLoggedIn, changePassword);

module.exports = router;
