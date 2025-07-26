import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import './CheckOut.css';
import { addBooking } from '../../redux/slices/bookingSlice';

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { car, totalPrice, startDate, endDate, selectedOptions = [], withDriver = false } = location.state;
  const { user, token } = useSelector((state) => state.authUser);

  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [message, setMessage] = useState('');
  const [orderNotes, setOrderNotes] = useState('');
  const [billingDetails, setBillingDetails] = useState({
    firstName: user?.name.split(' ')[0] || '',
    lastName: user?.name.split(' ')[1] || '',
    email: user?.email || '',
    phone: user?.contactNumber || '',
    address: '',
    city: user?.city || '',
    state: '',
    zip: ''
  });

  const driverCharge = withDriver && car.driver?.availability
  ? car.driver?.pricePerDay || 0
  : 0;


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBillingDetails({ ...billingDetails, [name]: value });
  };

  const handleApplyCoupon = () => {
    if (couponCode === 'FIRSTBOOK') {
      setDiscount(totalPrice * 0.05);
    } else {
      setDiscount(0);
    }
  };

  const validateForm = () => {
    const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'address', 'city', 'state', 'zip'];
    for (let field of requiredFields) {
      if (!billingDetails[field]) {
        setMessage(`Please enter ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}`);
        return false;
      }
    }
    return true;
  };

  const handlePlaceOrder = async () => {
    if (!validateForm()) return;

    const bookingData = {
      car:
        {
          carId: car._id || car.id,
          title: `${car.make} ${car.model} (${car.year}) (${car.vehicleId})`,
          image: car.image
        },
      hostId: car.host._id || car.hostId,
      userId: user._id || user.id,
      totalPrice: totalPrice - discount + driverCharge,
      withDriver,
      driverCharge,
      startDate,
      endDate,
      billingDetails,
      orderNotes,
      discount,
      bookingType: 'single',
      bookingStatus: 'pending',
      completed: false
    };

    try {
      const response = await dispatch(addBooking({ bookingData, token }));
      console.log(response);
      const bookingId = response.payload.booking._id || response.payload.booking.bookingId;
      navigate(`/order-details/${bookingId || response.payload.bookingId}`);
    } catch (error) {
      setMessage(error.message || 'Failed to place order');
    }
  };

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>

      {/* Billing Info */}
      <div className="billing-details">
        <h3>Billing Details</h3>
        <form>
          {['firstName', 'lastName', 'email', 'phone', 'address', 'city', 'state', 'zip'].map((field) => (
            <input
              key={field}
              type={field === 'email' ? 'email' : 'text'}
              name={field}
              placeholder={field.replace(/([A-Z])/g, ' $1')}
              value={billingDetails[field]}
              onChange={handleInputChange}
              required
            />
          ))}
        </form>
      </div>

      {/* Notes */}
      <div className="additional-information">
        <h3>Additional Information</h3>
        <textarea
          placeholder="Notes about your order"
          value={orderNotes}
          onChange={(e) => setOrderNotes(e.target.value)}
        />
      </div>

      {/* Coupon */}
      <div className="coupon-code">
        <h3>Apply Coupon</h3>
        <input
          type="text"
          placeholder="Coupon Code"
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
        />
        <button onClick={handleApplyCoupon}>Apply</button>
      </div>

      {/* Summary */}
      <div className="order-summary mt-3">
        <h3>Your Order</h3>
        <div className="order-details">
          <p><strong>Product:</strong> <b>{car.make} {car.model} ({car.vehicleId})</b></p>
          <p><strong>Check In:</strong> {new Date(startDate).toLocaleDateString()}</p>
          <p><strong>Check Out:</strong> {new Date(endDate).toLocaleDateString()}</p>
          <p><strong>Subtotal:</strong> ₹{totalPrice.toFixed(2)}</p>
          {withDriver && <p><strong>Driver Charge:</strong> ₹{car.driver?.pricePerDay || 0}</p>}
          <p><strong>Discount:</strong> ₹{discount.toFixed(2)}</p>
          <p className="fw-bold fs-5">
            Total: ₹{(totalPrice - discount + (withDriver ? driverCharge : 0)).toFixed(2)}
          </p>
        </div>
        <button className="place-order" onClick={handlePlaceOrder}>Place Order</button>
        {message && <div className="alert alert-info mt-3">{message}</div>}
      </div>
    </div>
  );
};

export default Checkout;
