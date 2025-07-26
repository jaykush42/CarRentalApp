const Car = require('../../../models/Car');

class HostCarStrategy {
  async getCarsByHost(req, res) {
    try {
      const hostId = req.user._id;
      const cars = await Car.find({ host: hostId });
      res.status(200).json(cars);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  async getCarByHost(req, res) {
    try {
      const { id } = req.params;
      const car = await Car.findOne({ _id: id, host: req.user._id });
      if (!car) return res.status(404).json({ message: 'Car not found' });
      res.status(200).json(car);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

   async addCar(req, res) {
    try {
      if (req.user.role !== 'host') {
        return res.status(403).json({ message: 'Only hosts can add cars' });
      }

      const car = new Car({
        ...req.body,
        host: req.user._id // ✅ required field
      });

      await car.save();
      res.status(201).json(car);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }


  async updateCar(req, res) {
    try {
      const { id } = req.params;
      const car = await Car.findOneAndUpdate(
        { _id: id, host: req.user._id },
        req.body,
        { new: true }
      );
      if (!car) return res.status(404).json({ message: 'Unauthorized or car not found' });
      res.status(200).json(car);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }

   async updateStatus(req, res) {
      const { hostId, id } = req.params;

      const data = req.body;

      const car = await Car.findById(id);

      if (!car) return res.status(404).json({ message: 'Car not found' });
      
      if(data.field == 'available') {
        car.available = data.value;
        }
      else if(data.field == 'driver.availability') {
        car.driver.availability = data.value;
      }

      await car.save();
      
      res.status(200).json({ message: 'Rating updated successfully', car });
    };

  async deleteCar(req, res) {
    try {
      const { id } = req.params;
      const car = await Car.findOneAndDelete({ _id: id, host: req.user._id });
      if (!car) return res.status(404).json({ message: 'Unauthorized or car not found' });
      res.status(200).json({ message: 'Car deleted successfully' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  async updateRating(req, res) {
    res.status(403).json({ message: 'Hosts cannot update car ratings' });
  }
}

module.exports = HostCarStrategy;
