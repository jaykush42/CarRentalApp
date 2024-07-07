const express = require('express');
const router = express.Router();
const Car = require('../models/Car');

router.get('/', async (req, res) => {
    try {
        const cars = await Car.find();
        res.status(200).json(cars);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

router.post('/', async (req, res) => {
    const car = req.body;
    const newCar = new Car(car);
    try {
        await newCar.save();
        res.status(201).json(newCar);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
});

router.patch('/:id', async (req, res) => {
    try {
        const updatedCar = await Car.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedCar);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        await Car.findByIdAndRemove(req.params.id);
        res.status(200).json({ message: 'Car deleted successfully' });
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
});

module.exports = router;
