const Car = require('../../../models/Car');
const BaseCarFilterStrategy = require('./baseStrategy');

class AllCarsStrategy extends BaseCarFilterStrategy {

  async getCars(req, res) {
    try {
      const cars = await Car.find().populate('host', 'name');
      res.status(200).json(cars);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async getCar(req, res) {
    const { id } = req.params;
    try {
      const car = await Car.findById(id).populate('host', 'name');
      if (!car) return res.status(404).json({ message: 'Car not found' });
      res.status(200).json(car);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
  async filter() {
    return await Car.find({ available: true }).populate('host', 'name');
  }
}

module.exports = AllCarsStrategy;
