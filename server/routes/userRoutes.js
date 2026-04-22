const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const { getUserProfile, updateUserProfile } = require('../controllers/userController');

// GET /api/user/profile - Protected route
router.get('/profile', authMiddleware, getUserProfile);

// PUT /api/user/profile - Protected route
router.put('/profile', authMiddleware, updateUserProfile);

module.exports = router;
