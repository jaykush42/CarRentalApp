// services/booking/strategies/queueStrategy.js

const BookingStrategy = require('./bookingStrategy');

class QueueStrategy extends BookingStrategy {
  async book(data) {
    /**
     * FUTURE:
     * Push the booking request to a message queue (e.g. Bull, RabbitMQ)
     * A separate worker will process the queue to avoid race conditions.
     */
    throw new Error('Queue-based booking strategy not implemented yet.');
  }
}

module.exports = QueueStrategy;
