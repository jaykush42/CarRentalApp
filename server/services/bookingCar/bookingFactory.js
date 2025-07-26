const AtomicLockStrategy = require('./strategies/atomicLockStrategy');
const QueueStrategy = require('./strategies/queueStrategy');

class BookingFactory {
  static getStrategy(type = 'atomic') {
    switch (type) {
      case 'atomic':
        return new AtomicLockStrategy(); // ✅ Ensure this is a class
      case 'queue':
        return new QueueStrategy();
      default:
        throw new Error(`Unknown booking strategy: ${type}`);
    }
  }
}

module.exports = BookingFactory;
