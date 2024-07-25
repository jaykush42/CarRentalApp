import React, { useEffect } from 'react';
import {  useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { fetchBookingById } from "../redux/slices/bookingSlice";
import './OrderDetails.css'; 

const OrderDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { order, isLoading } = useSelector((state) => state.bookings);
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    if (id && token) {
      dispatch(fetchBookingById({ id, token }));
    }
  }, [dispatch, id, token]);

  const navigate = useNavigate();
 
  const handleCarClick = (carId) => {
    navigate(`/car/${carId}`);
  };


  if (isLoading) {
    return <div className="text-center mt-5">Loading...</div>;
  }

  if (!order) {
    return <div className="text-center mt-5">Order not found</div>;
  }

  return (
    <div className="mt-5 order-details-container">
      <div className="card shadow-sm">
        <div className="card-header bg-primary text-white">
          <h2 className="card-title mb-0">Order Details</h2>
        </div>
        <div className="card-body">
          <div className="row mb-3">
            <div className="col-md-6">
              <strong><h2>{order.car.title}</h2></strong> 
            </div>
            <div className="col-md-6">
             {order.car.image && (
                  <img
                    className="rounded"
                    src={order.car.image}
                    alt="Car image"
                    style={{ objectFit: 'cover',width:'100%'}}
                    onClick={()=>handleCarClick(order.car.carId)}
                  />
                )}
                </div> 
           
          </div>
          <div className="row mb-3">
            <div className="col-md-6">
              <strong>Check In:</strong> {new Date(order.startDate).toLocaleDateString()}
            </div>
            <div className="col-md-6">
              <strong>Check Out:</strong> {new Date(order.endDate).toLocaleDateString()}
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-md-6">
              <strong>Subtotal:</strong> ₹{order.totalPrice.toFixed(2)}
            </div>
            <div className="col-md-6">
              <strong>Discount:</strong> ₹{order.discount?.toFixed(2)}
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-md-6">
             <strong><h5 className='fw-bold'>Total Paid Amount: ₹{(order.totalPrice - (order.discount || 0)).toFixed(2)}</h5></strong>
            </div>
          </div>
          <div className="mb-3">
            <strong className='fs-4'>Billing Details:</strong>
            <p className="mb-1">{order.billingDetails.firstName} {order.billingDetails.lastName}</p>
            <p className="mb-1">{order.billingDetails.email}</p>
            <p className="mb-1">{order.billingDetails.phone}</p>
            <p className="mb-1">{order.billingDetails.address}, {order.billingDetails.city}, {order.billingDetails.state}, {order.billingDetails.zip}</p>
          </div>
          {order.orderNotes && <div className="mb-3">
            <strong>Order Notes:</strong> {order.orderNotes}
          </div>}
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
