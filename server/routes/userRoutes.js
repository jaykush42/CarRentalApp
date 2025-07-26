const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { protect } = require('../middlewares/protect');

// Auth
router.post('/signup', userController.signUp);
router.post('/login', userController.login);

// Profile
router.put('/update', protect, userController.updateUser);
router.put('/change-password', protect, userController.changePassword);

// (Optional future routes)
router.get('/me', protect, (req, res) => {
  res.json({ user: req.user });
});

module.exports = router;
