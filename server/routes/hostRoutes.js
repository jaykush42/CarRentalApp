const express = require('express');
const router = express.Router();
const hostController = require('../controllers/hostController');
const { protect } = require('../middlewares/protect');


router.post('/signup', hostController.signUp);
router.post('/login', hostController.login);
router.put('/updateData', protect, hostController.updateHost);
router.put('/change-password', protect, hostController.changePassword);
router.put('/change-pin', protect, hostController.changeHostPin);
router.get('/me', protect, hostController.getHostProfile);

module.exports = router;