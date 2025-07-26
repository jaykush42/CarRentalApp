const HostCarStrategy = require('./strategies/hostCarsStrategy');
const UserCarStrategy = require('./strategies/userCarStrategy');

class CarStrategyFactory {
  static getStrategy(role) {
    if (role === 'host') return new HostCarStrategy();
    return new UserCarStrategy();
  }
}

module.exports = CarStrategyFactory;
