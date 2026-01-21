const Car = require('../models/Car');
const { discoverCars } = require('../services/car/carDiscoveryManager');
const CarStrategyFactory = require('../services/car/carStrategyFactory');

exports.getCars = async (req, res) => {
  try {
    const cars = await discoverCars({ user: req.user || null });
    res.status(200).json(cars);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getCar = async (req, res) => {
    const { id } = req.params;
       try {
         const car = await Car.findById(id).populate('host', 'name');
         if (!car) return res.status(404).json({ message: 'Car not found' });
         res.status(200).json(car);
       } catch (error) {
         res.status(500).json({ message: error.message });
       }
};

exports.searchCars = async (req, res) => {
  try {
    const cars = await discoverCars({ user: req.user || null, filterData: req.body });
    res.status(200).json(cars);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateRating = async (req, res) => {
  try {
    const strategy = CarStrategyFactory.getStrategy(req.user.role);
    await strategy.updateRating(req, res);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getCarsByHost = async (req, res) => {
  const strategy = CarStrategyFactory.getStrategy(req.user.role);
  await strategy.getCarsByHost(req, res);
};

exports.getCarByHost = async (req, res) => {
  const strategy = CarStrategyFactory.getStrategy(req.user.role);
  await strategy.getCarByHost(req, res);
};

exports.addCar = async (req, res) => {
  const strategy = CarStrategyFactory.getStrategy(req.user.role);
  await strategy.addCar(req, res);
};

exports.updateCar = async (req, res) => {
  const strategy = CarStrategyFactory.getStrategy(req.user.role);
  await strategy.updateCar(req, res);
};

exports.updateStatus = async (req, res) => {
  const strategy = CarStrategyFactory.getStrategy(req.user.role);
  await strategy.updateStatus(req, res);
};

exports.deleteCar = async (req, res) => {
  const strategy = CarStrategyFactory.getStrategy(req.user.role);
  await strategy.deleteCar(req, res);
};

