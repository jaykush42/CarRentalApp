const CarFilterFactory = require('./carFilterFactory');

async function discoverCars({ user = null, filterData = null }) {
  const strategy = CarFilterFactory.getStrategy({ user, filterData });
  return await strategy.filter();
}

module.exports = { discoverCars };
