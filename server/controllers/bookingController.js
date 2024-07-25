const Booking = require('../models/Booking');

exports.getBookings = async (req, res) => {
    try {
        const userId = req.query.userId;

        if (!userId) {
            return res.status(400).json({ message: 'User ID is required' });
        }
        const bookings = await Booking.find({ userId: userId })

         res.json(bookings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getBookingById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ message: 'ID is required' });
        }
        const order = await Booking.findById(id)
         res.json(order);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


exports.addBooking = async (req, res) => {
    const {
        car,
        userId,
        totalPrice,
        startDate,
        endDate,
        billingDetails,
        orderNotes,
        discount
    } = req.body;

    const booking = new Booking({
        car,
        userId,
        totalPrice,
        startDate,
        endDate,
        billingDetails,
        orderNotes,
        discount
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