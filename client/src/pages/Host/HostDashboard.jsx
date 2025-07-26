import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchHostCars } from "../../redux/slices/carSlice";
import { fetchBookingsByHostId } from "../../redux/slices/bookingSlice";
import './HostDashboard.css';

const HostDashboard = () => {
  const dispatch = useDispatch();
  const { host, token } = useSelector((state) => state.authHost);
  const { cars, isLoading: isCarLoading } = useSelector((state) => state.cars);
  const { bookings, isLoading: isBookingLoading } = useSelector((state) => state.bookings);

  useEffect(() => {
    if (host && token) {
      dispatch(fetchHostCars({ hostId: host._id, token }));
      dispatch(fetchBookingsByHostId({ hostId: host._id, token }));
    }
  }, [host, token, dispatch]);

  const totalEarnings = bookings.reduce((sum, booking) => sum + booking.totalPrice, 0);

  return (
    <div className="container mt-3 dashboard-container">
      <h2 className="mb-4 text-white">Host Dashboard</h2>

      {/* Summary Cards */}
      <div className="row mb-3">
        <div className="col-md-3">
          <div className="card text-white bg-primary">
            <div className="card-body">
              <h5>Total Cars</h5>
              <h3>{cars.length}</h3>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-white bg-success">
            <div className="card-body">
              <h5>Active Bookings</h5>
              <h3>{bookings.length}</h3>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-white bg-info">
            <div className="card-body">
              <h5>Total Earnings</h5>
              <h3>₹{totalEarnings}</h3>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-white bg-warning">
            <div className="card-body">
              <h5>Driver Availability</h5>
              <h3>{cars.filter(car => car.driver?.availability).length}</h3>
            </div>
          </div>
        </div>
      </div>

      {/* Hosted Cars */}
      <div className="card mb-3">
        <div className="card-header bg-light">
          <h4>Your Hosted Cars</h4>
        </div>
        <div className="card-body">
          {isCarLoading ? (
            <div className="text-center">Loading cars...</div>
          ) : (
            <div className="row">
              {cars.map(car => (
                <div className="col-md-2" key={car._id}>
                  <div className="card shadow-sm">
                    <img src={car.image} className="card-img-top" alt={car.make} style={{ height: "100px", objectFit: "cover" }} />
                    <div className="card-body">
                      <h5 className="card-title">{car.make} {car.model}</h5>
                      <p className="card-text">
                        ₹{car.pricePerDay}/day · {car.category} · {car.transmission}
                      </p>
                      <p className="text-muted mb-1">Vehicle ID: {car.vehicleId}</p>
                      <span className={`badge ${car.available ? 'bg-success' : 'bg-secondary'}`}>
                        {car.available ? 'Available' : 'Unavailable'}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Booking Summary */}
      <div className="card mb-2">
        <div className="card-header bg-light">
          <h4>Recent Bookings</h4>
        </div>
        <div className="card-body table-responsive">
          {isBookingLoading ? (
            <div className="text-center">Loading bookings...</div>
          ) : (
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Car</th>
                  <th>Customer</th>
                  <th>Check-In</th>
                  <th>Check-Out</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {bookings.slice(0, 5).map(booking => (
                  <tr key={booking._id}>
                    <td>{booking.car?.title}</td>
                    <td>{booking.billingDetails?.firstName}</td>
                    <td>{new Date(booking.startDate).toLocaleDateString()}</td>
                    <td>{new Date(booking.endDate).toLocaleDateString()}</td>
                    <td>₹{booking.totalPrice}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default HostDashboard;
