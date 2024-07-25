const Car = require('../models/Car');
const Booking = require('../models/Booking');
const { parseISO } = require('date-fns');

exports.getCars = async (req, res) => {
    try {
        const cars = await Car.find();
        res.status(200).json(cars);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getCar = async (req, res) => {
    const { id } = req.params;
    try {
        const car = await Car.findById(id);
        res.status(200).json(car);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.addCar = async (req, res) => {
    const car = new Car(req.body);
    try {
        await car.save();
        res.status(201).json(car);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.updateCar = async (req, res) => {
    const { id } = req.params;
    try {
        const car = await Car.findByIdAndUpdate(id, req.body, { new: true });
        if (!car) return res.status(404).json({ message: 'Car not found' });
        res.status(200).json(car);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.updateRating = async (req, res) => {
    try {
        const { id } = req.params;
        const { updatedRating } = req.body;
    
        const car = await Car.findById(id);
        if (!car) {
          return res.status(404).json({ message: 'Car not found' });
        }

        car.rating = updatedRating;
        await car.save();
        
        res.status(200).json({ message: 'Rating updated successfully', car });
    } catch (error) {
        console.error("Error updating rating:", error); 
        res.status(500).json({ message: 'Server error', error });
    }
};

exports.deleteCar = async (req, res) => {
    const { id } = req.params;
    try {
        const car = await Car.findByIdAndDelete(id);
        if (!car) return res.status(404).json({ message: 'Car not found' });
        res.status(200).json({ message: 'Car deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.searchCars = async (req, res) => {
    const { city, category, startDate, endDate } = req.body;
    const parsedStartDate = parseISO(startDate);
    const parsedEndDate = parseISO(endDate);

    try {
        const availableCars = await Car.aggregate([
            { $match: { city, category } },
            {
                $lookup: {
                    from: 'bookings',
                    localField: '_id',
                    foreignField: 'car.carId',
                    as: 'bookings',
                },
            },
            {
                $addFields: {
                    conflictingBookings: {
                        $filter: {
                            input: '$bookings',
                            as: 'booking',
                            cond: {
                                $or: [
                                    { $and: [{ $gte: ['$$booking.startDate', parsedStartDate] }, { $lte: ['$$booking.startDate', parsedEndDate] }] },
                                    { $and: [{ $gte: ['$$booking.endDate', parsedStartDate] }, { $lte: ['$$booking.endDate', parsedEndDate] }] },
                                    { $and: [{ $lte: ['$$booking.startDate', parsedStartDate] }, { $gte: ['$$booking.endDate', parsedEndDate] }] },
                                    { $and: [{ $lte: ['$$booking.startDate', parsedEndDate] }, { $gte: ['$$booking.endDate', parsedStartDate] }] },
                                ],
                            },
                        },
                    },
                },
            },
            { $match: { conflictingBookings: { $size: 0 } } },
            { $project: { bookings: 0, conflictingBookings: 0 } },
        ]);

        res.json(availableCars);
    } catch (err) {
        res.status(500).send(err.message);
    }
};
