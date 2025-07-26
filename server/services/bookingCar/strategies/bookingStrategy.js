// services/booking/strategies/bookingStrategy.js

class BookingStrategy {
  async book(data) {
    throw new Error('book() method must be implemented by the strategy.');
  }
}

module.exports = BookingStrategy;
