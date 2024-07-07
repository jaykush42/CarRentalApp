import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { fetchCars } from '../redux/slices/carSlice';

const BookingCar = () => {
    const dispatch = useDispatch();
    const { cars, isLoading } = useSelector((state) => state.cars);
    const { user } = useSelector((state) => state.auth);
    const [formData, setFormData] = useState({
        carId: '',
        startDate: '',
        endDate: '',
    });
    const [message, setMessage] = useState('');

    useEffect(() => {
        dispatch(fetchCars());
    }, [dispatch]);

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user || !user.token) {
            setMessage('Error: No user token found.');
            return;
        }
        try {
            const response = await axios.post(
                'http://localhost:5000/api/bookings',
                {
                    carId: formData.carId,
                    startDate: formData.startDate,
                    endDate: formData.endDate,
                },
                {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                }
            );
            setMessage('Booking successful!');
        } catch (error) {
            setMessage('Error: ' + (error.response?.data?.message || 'Booking failed.'));
        }
    };

    return (
        <div>
            <h2>Book a Car</h2>
            <form onSubmit={handleSubmit}>
                <select name="carId" value={formData.carId} onChange={handleChange} required>
                    <option value="">Select a car</option>
                    {cars.map((car) => (
                        <option key={car._id} value={car._id}>
                            {car.make} {car.model}
                        </option>
                    ))}
                </select>
                <input type="date" name="startDate" value={formData.startDate} onChange={handleChange} required />
                <input type="date" name="endDate" value={formData.endDate} onChange={handleChange} required />
                <button type="submit" disabled={isLoading}>Book</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default BookingCar;
