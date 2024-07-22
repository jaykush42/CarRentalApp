const Booking = require('../models/Booking');

exports.getBookings = async (req, res) => {
    try {
        const userId = req.query.userId;

        if (!userId) {
            return res.status(400).json({ message: 'User ID is required' });
        }
        const bookings = await Booking.find({ userId: userId }).populate('car');

         res.json(bookings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


exports.addBooking = async (req, res) => {
    const { userId, car, startDate, endDate, totalPrice } = req.body;
    const { carId, make, model, year, pricePerDay, image } = car;

    const booking = new Booking({
        userId,
        car: {
            carId,
            make,
            model,
            year,
            pricePerDay,
            image
        },
        startDate,
        endDate,
        totalPrice
    });

    try {
        await booking.save();
        res.status(201).json(booking);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteBooking = async (req, res) => {
    const { id } = req.params;
    try {
        const booking = await Booking.findByIdAndDelete(id);
        if (!booking) return res.status(404).json({ message: 'Booking not found' });
        res.status(200).json({ message: 'Booking deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};