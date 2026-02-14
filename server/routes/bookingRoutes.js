const express = require('express');
const {
  getBookings,
  addBooking,
  deleteBooking,
  getBookingById,
  getBookingsByHostId,
  checkBookingOverlap
} = require('../controllers/bookingController');
const { protect } = require('../middlewares/protect');

const router = express.Router();

// All booking routes require login (use)
router.get('/', protect, getBookings);
router.get('/:id', protect, getBookingById);
router.get('/host/:id', protect, getBookingsByHostId);
router.post('/', protect, addBooking);
router.delete('/:id', protect, deleteBooking);
router.post('/check-overlap', protect, checkBookingOverlap);

module.exports = router;
