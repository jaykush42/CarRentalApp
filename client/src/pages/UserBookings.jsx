import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBookings, cancelBooking } from "../redux/slices/bookingSlice";
import {  useNavigate } from 'react-router-dom';
import "./UserBookings.css";

const UserBookings = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { bookings, isLoading } = useSelector((state) => state.bookings);
  const {  isLoading: isCarsLoading } = useSelector((state) => state.cars);
  const { user, token } = useSelector((state) => state.auth);
  const [deleteMessage, setDeleteMessage] = useState("");

  useEffect(() => {
    if (user && token) {
      dispatch(fetchBookings({ userId: user._id, token }));
    }
  }, [dispatch, user, token]);

  const handleCancelBooking = (bookingId) => {
    dispatch(cancelBooking({ bookingId, token })).then((result) => {
      if (result.type === "bookings/cancelBooking/fulfilled") {
        setDeleteMessage("Booking cancelled successfully.");
      } else {
        setDeleteMessage("Failed to cancel booking.");
      }
    });
  };

  const handleViewDetails = (bookingId)=>{
    navigate(`/order-details/${bookingId}`);
  }

  return (
    <div className="booking-cont mt-5">
      <h1 className="mb-4">My Bookings</h1>
      {deleteMessage && <div className="alert alert-info">{deleteMessage}</div>}
      {isLoading || isCarsLoading ? (
        <div className="d-flex justify-content-center">
          <div className="spinner-border text-primary" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="horizontal-list">
          {bookings.slice().reverse().map((booking) => {
            const car = booking.car;
            const startDate = new Date(booking.startDate);
            const endDate = new Date(booking.endDate);
            const isEndDateValid = endDate > startDate;

            return (
              <div key={booking._id} className="card mb-3">
                <div className="row g-0 align-items-center">
                  <div className="col-md-3 imgCont">
                    {car && car.image && (
                      <img
                        className="img-fluid rounded-start"
                        src={car.image}
                        alt="Car"
                        style={{height:'18vh'}}
                      />
                    )}
                  </div>
                  <div className="col-md-6">
                    <div className="card-body">
                      <h5 className="card-title">
                        {car
                          ? car.title
                          : "Car details not available"}
                      </h5>
                      <p className="card-text price-text">
                        ₹{booking.totalPrice}
                      </p>
                      <p className="card-text date-text d-flex">
                        <span>From: {startDate.toLocaleDateString()}</span>
                        &nbsp; &nbsp;
                        <span> To: {endDate.toLocaleDateString()}</span>
                      </p>
                      {!isEndDateValid && (
                        <p className="text-danger">
                          End date should be after the start date.
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="col-md-3 btn-cont mb-3">
                  <button
                      className="btn btn-danger btn-sm fw-bold"
                      onClick={() => handleCancelBooking(booking._id)}
                      disabled={!isEndDateValid}
                    >
                      Cancel Booking
                    </button>
                  <button
                      className="btn btn-success btn-sm fw-bold"
                      onClick={() => handleViewDetails(booking._id)}
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default UserBookings;
