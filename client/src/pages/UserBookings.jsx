import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBookings } from '../redux/slices/bookingSlice';

const UserBookings = () => {
    const dispatch = useDispatch();
    const { bookings, isLoading } = useSelector((state) => state.bookings);
    const { user } = useSelector((state) => state.auth);

    useEffect(() => {
        dispatch(fetchBookings());
    }, [dispatch]);

    return (
        <div>
            <h1>My Bookings</h1>
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <ul>
                    {bookings.filter(booking => booking.user._id === user._id).map((booking) => (
                        <li key={booking._id}>
                            {booking.car.make} {booking.car.model} - ${booking.totalPrice} (from {new Date(booking.startDate).toLocaleDateString()} to {new Date(booking.endDate).toLocaleDateString()})
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default UserBookings;
