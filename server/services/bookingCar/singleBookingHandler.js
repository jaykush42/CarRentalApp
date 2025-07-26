// services/booking/strategies/singleBookingHandler.js

const Booking = require('../../models/Booking');  

async function handleSingleBooking(data, session = null) {
  const { carId, title, image } = data.car;

  const {
    hostId,
    userId,
    totalPrice,
    withDriver,
    driverCharge,
    startDate,
    endDate,
    billingDetails,
    orderNotes,
    discount,
    bookingType,
    bookingStatus,
    completed
  } = data;

  const booking = new Booking({
    car: { carId, title, image },
    hostId,
    userId,
    totalPrice,
    withDriver,
    driverCharge,
    startDate,
    endDate,
    billingDetails,
    orderNotes,
    discount,
    bookingType
  });

  const result = await booking.save({ session });
  return result;
}

module.exports = handleSingleBooking;
