import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import './CheckOut.css';
import { addBooking } from '../redux/slices/bookingSlice';

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { car, totalPrice, startDate, endDate } = location.state;
  const { user, token } = useSelector((state) => state.auth);
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);
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
  const [orderNotes, setOrderNotes] = useState('');
  const [message, setMessage] = useState('');

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
    if (validateForm()) {
      const bookingData = {
        car:{carId: car._id, title: `${car.make} ${car.model} (${car.year}) `, image: car.image},
        userId: user._id,
        totalPrice: totalPrice - discount,
        startDate,
        endDate,
        billingDetails,
        orderNotes,
        discount
      };

      try {
        const response = await dispatch(addBooking({ bookingData, token }));
        navigate(`/order-details/${response.payload._id}`);
      } catch (error) {
        setMessage(error.message || 'Failed to place order');
      }
    }
  };

  return (
    <div className="checkout-container ">
      <h2>CheckOut</h2>
      <div className="billing-details">
        <h3>Billing Details</h3>
        <form>
          <input type="text" name="firstName" placeholder="First Name" value={billingDetails.firstName} onChange={handleInputChange} required />
          <input type="text" name="lastName" placeholder="Last Name" value={billingDetails.lastName} onChange={handleInputChange} required />
          <input type="email" name="email" placeholder="Email" value={billingDetails.email} onChange={handleInputChange} required />
          <input type="text" name="phone" placeholder="Phone" value={billingDetails.phone} onChange={handleInputChange} required />
          <input type="text" name="address" placeholder="Address" value={billingDetails.address} onChange={handleInputChange} required />
          <input type="text" name="city" placeholder="City" value={billingDetails.city} onChange={handleInputChange} required />
          <input type="text" name="state" placeholder="State" value={billingDetails.state} onChange={handleInputChange} required />
          <input type="text" name="zip" placeholder="ZIP Code" value={billingDetails.zip} onChange={handleInputChange} required />
        </form>
      </div>

      <div className="additional-information">
        <h3>Additional Information</h3>
        <textarea placeholder="Notes about your order, e.g. special notes for delivery." value={orderNotes} onChange={(e) => setOrderNotes(e.target.value)} />
      </div>

      <div className="coupon-code">
        <h3>Apply Coupon</h3>
        <input type="text" placeholder="Coupon Code" value={couponCode} onChange={(e) => setCouponCode((e.target.value).toUpperCase())} />
        <button onClick={handleApplyCoupon}>Apply</button>
      </div>

      <div className="order-summary mt-3">
        <h3>Your Order</h3>
        <div className="order-details">
          <div>
            <strong>Product:</strong> <b>{car.make} {car.model}</b>
          </div>
          <div>
            <strong>Check In:</strong> {new Date(startDate).toLocaleDateString()}
          </div>
          <div>
            <strong>Check Out:</strong> {new Date(endDate).toLocaleDateString()}
          </div>
          <div>
            <strong>Subtotal:</strong> ₹{totalPrice.toFixed(2)}
          </div>
          <div>
            <strong>Discount:</strong> ₹{discount.toFixed(2)}
          </div>
          <div>
            <strong>Total:</strong><b> ₹{(totalPrice - discount).toFixed(2)}</b>
          </div>
        </div>
        <button className="place-order" onClick={handlePlaceOrder}>Place Order</button>
        {message && <div className="alert alert-info mt-3">{message}</div>}
      </div>
    </div>
  );
};

export default Checkout;
