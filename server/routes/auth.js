
const express = require('express');
const { signUp, login, updateUser, changePassword } = require('../controllers/userController');
const auth = require('../middleware/auth');
const router = express.Router();

router.post('/login', login);
router.post('/signup', signUp);
router.put('/update', auth, updateUser);
router.put('/change-password', auth, changePassword);

module.exports = router;
