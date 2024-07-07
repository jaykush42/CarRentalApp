const express = require('express');
const { getBookings, addBooking } = require('../controllers/bookingController');
const auth = require('../middleware/auth');
const router = express.Router();

router.get('/', auth, getBookings);
router.post('/', auth, addBooking);

module.exports = router;
