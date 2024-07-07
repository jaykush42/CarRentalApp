const mongoose = require('mongoose');

const bookingSchema = mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    car: { type: mongoose.Schema.Types.ObjectId, ref: 'Car' },
    startDate: Date,
    endDate: Date,
    totalPrice: Number,
});

module.exports = mongoose.model('Booking', bookingSchema);
