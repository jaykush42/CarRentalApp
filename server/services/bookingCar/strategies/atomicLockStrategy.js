const mongoose = require('mongoose');
const Booking = require('../../../models/Booking');
const handleSingleBooking = require('../singleBookingHandler');
const BookingStrategy = require('./bookingStrategy'); // Assuming this is the base class for booking

class AtomicLockStrategy extends BookingStrategy {
  async book(data) {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { car, startDate, endDate } = data;

    const overlappingBooking = await Booking.findOne({
      'car.carId': car.carId,
      $or: [
        { startDate: { $lt: new Date(endDate) }, endDate: { $gt: new Date(startDate) } }
      ]
    }).session(session);

    if (overlappingBooking) {
      throw new Error('Car is already booked for the selected date range.');
    }

    // Pass session to booking function
    const newBooking = await handleSingleBooking(data, session);

    await session.commitTransaction();
    return newBooking;
  } catch (err) {
    await session.abortTransaction();
    throw err;
  } finally {
    session.endSession();
  }
};

}

module.exports = AtomicLockStrategy;
