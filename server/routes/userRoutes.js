const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const { getUserProfile, updateUserProfile, verifyEmail } = require('../controllers/userController');

// GET /api/user/profile - Protected route
router.get('/profile', authMiddleware, getUserProfile);

// PUT /api/user/profile - Protected route
router.put('/profile', authMiddleware, updateUserProfile);

// POST /api/user/verify-email - Protected route
router.post('/verify-email', authMiddleware, verifyEmail);

module.exports = router;
