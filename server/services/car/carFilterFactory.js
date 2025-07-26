const AllCarsStrategy = require('./strategies/allCarsStrategy');
const CityFilterStrategy = require('./strategies/cityFilterStrategy');
const AdvancedFilterStrategy = require('./strategies/advancedFilterStrategy');

class CarFilterFactory {
  static getStrategy({ user, filterData }) {
    if (filterData?.city || filterData?.category || filterData?.startDate || filterData?.endDate || filterData?.priceRange) {
      return new AdvancedFilterStrategy(filterData);
    }

    if (user?.city) {
      return new CityFilterStrategy(user.city);
    }

    return new AllCarsStrategy();
  }
}

module.exports = CarFilterFactory;
