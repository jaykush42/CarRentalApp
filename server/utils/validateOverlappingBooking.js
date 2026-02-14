const Booking = require("../models/Booking");

const overlappingBooking = async (car, startDate, endDate) => {
  try {
    const carId =
      car?.carId?._id || car?.carId || car?._id;

    if (!carId) {
      return { success: true };
    }

     const overlapping = await Booking.findOne({
      "car.carId": carId,
      startDate: { $lt: new Date(endDate) },
      endDate: { $gt: new Date(startDate) },
    }).select("startDate endDate");

    if (overlapping) {
      return {
        success: false,
        message: "Car is already booked for the selected dates",
        bookedFrom: overlapping.startDate,
        bookedTo: overlapping.endDate,
      };
    }

    return { success: true };
  } catch (error) {
    return {
      success: false,
      message: "Error checking booking availability",
    };
  }
};

module.exports = overlappingBooking
