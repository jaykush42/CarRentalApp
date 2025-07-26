// services/booking/bookingManager.js

const BookingFactory = require('./bookingFactory');

// Main interface: create booking using strategy
async function createBooking(data, type = 'atomic') {
  const strategy = BookingFactory.getStrategy(type);

  return await strategy.book(data);
}

module.exports = {
  createBooking
};
