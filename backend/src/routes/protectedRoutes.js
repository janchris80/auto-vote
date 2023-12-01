// backend/src/routes/someProtectedRoute.js
const express = require('express');
const authenticateToken = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/protected', authenticateToken, (req, res) => {
  // Access user from req.user
  res.send('This is a protected route');
});

module.exports = router;
