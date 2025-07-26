const Car = require('../../../models/Car');
const BaseCarFilterStrategy = require('./baseStrategy');

class CityFilterStrategy extends BaseCarFilterStrategy {
  constructor(city) {
    super();
    this.city = city;
  }

  async filter() {
    return await Car.find({ city: this.city, available: true }).populate('host', 'name providesDriver');
  }
}

module.exports = CityFilterStrategy;
