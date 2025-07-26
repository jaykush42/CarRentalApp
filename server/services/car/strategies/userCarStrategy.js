const Car = require('../../../models/Car');

class UserCarStrategy {
  async updateRating(req, res) {
    const { id } = req.params;
    const { updatedRating } = req.body;
    const car = await Car.findById(id);
    if (!car) return res.status(404).json({ message: 'Car not found' });

    car.rating = updatedRating;
    await car.save();
    res.status(200).json({ message: 'Rating updated successfully', car });
  }

  async getCarsByHost(req, res) {
    res.status(403).json({ message: 'Unauthorized access for users' });
  }

  async getCarByHost(req, res) {
    res.status(403).json({ message: 'Unauthorized access for users' });
  }

  async addCar(req, res) {
    res.status(403).json({ message: 'Users cannot add cars' });
  }

  async updateCar(req, res) {
    res.status(403).json({ message: 'Users cannot update cars' });
  }
  async updateStatus(req, res) {
    res.status(403).json({ message: 'Users cannot update Status' });
  }

  async deleteCar(req, res) {
    res.status(403).json({ message: 'Users cannot delete cars' });
  }
}

module.exports = UserCarStrategy;
