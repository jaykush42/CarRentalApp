const express = require('express');
const { getBookings, addBooking, deleteBooking, getBookingById } = require('../controllers/bookingController');
const auth = require('../middleware/auth');
const router = express.Router();

router.get('/', auth, getBookings);
router.get('/:id', auth, getBookingById);
router.post('/', auth, addBooking);
router.delete('/:id', auth, deleteBooking);

module.exports = router;
