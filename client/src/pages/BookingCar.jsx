import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { fetchCars } from '../redux/slices/carSlice';

const BookingCar = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const { state } = location;
    const { cars, isLoading } = useSelector((state) => state.cars);
    const { user, token } = useSelector((state) => state.auth);
    const [formData, setFormData] = useState({
        carId: '',
        startDate: '',
        endDate: '',
        seats: '',
        transmission: '',
        fuel: '',
        mileage: '',
    });
    const [selectedCar, setSelectedCar] = useState(null);
    const [totalPrice, setTotalPrice] = useState(0);
    const [message, setMessage] = useState('');
    const [dateError, setDateError] = useState('');

    useEffect(() => {
        dispatch(fetchCars());
    }, [dispatch]);

    useEffect(() => {
        if (state && state.car) {
            setSelectedCar(state.car);
            setFormData({
                carId: state.car._id,
                startDate: state.startDate || '',
                endDate: state.endDate || '',
                seats: state.car.seats,
                transmission: state.car.transmission,
                fuel: state.car.fuel,
                mileage: state.car.mileage,
            });
        }
    }, [state]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        if (name === 'carId') {
            const car = cars.find((car) => car._id === value);
            setSelectedCar(car);
            setFormData({
                ...formData,
                carId: car._id,
                seats: car.seats,
                transmission: car.transmission,
                fuel: car.fuel,
                mileage: car.mileage,
            });
        }
    };

    const calculateTotalPrice = () => {
        if (selectedCar && formData.startDate && formData.endDate) {
            const start = new Date(formData.startDate);
            const end = new Date(formData.endDate);
            const numberOfDays = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
            const pricePerDay = selectedCar.pricePerDay || 0;
            const totalPrice = numberOfDays * pricePerDay;
            setTotalPrice(totalPrice);

            if (end <= start) {
                setDateError('End date must be after the start date.');
            } else {
                setDateError('');
            }
        }
    };

    useEffect(() => {
        calculateTotalPrice();
    }, [selectedCar, formData.startDate, formData.endDate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!token) {
            setMessage('Error: No user token found.');
            return;
        }
        if (dateError) {
            setMessage('Error: ' + dateError);
            return;
        }
        try {
            await axios.post(
                'http://localhost:5000/api/bookings',
                {
                    userId: user._id,
                    car: {
                        carId: selectedCar._id,
                        make: selectedCar.make,
                        model: selectedCar.model,
                        year: selectedCar.year,
                        pricePerDay: selectedCar.pricePerDay,
                        image: selectedCar.image,
                        seats: selectedCar.seats,
                        transmission: selectedCar.transmission,
                        fuel: selectedCar.fuel,
                        mileage: selectedCar.mileage,
                    },
                    startDate: formData.startDate,
                    endDate: formData.endDate,
                    totalPrice: totalPrice,
                },
                {
                    headers: {
                        'x-auth-token': token,
                    },
                }
            );
            setMessage('Booking successful!');
        } catch (error) {
            setMessage('Error: ' + (error.response?.data?.message || 'Booking failed.'));
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="mb-4">Book a Car</h2>
            <form onSubmit={handleSubmit} className="bg-light p-4 text-black fw-bold rounded shadow-sm">
                <div className="form-group mb-3">
                    <label htmlFor="carId">Select a car:</label>
                    <select
                        id="carId"
                        className="form-control"
                        name="carId"
                        value={formData.carId}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select a car</option>
                        {cars.map((car) => (
                            <option key={car._id} value={car._id}>
                                {car.make} {car.model} {car.year}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="startDate">Start Date:</label>
                    <input
                        type="date"
                        id="startDate"
                        className="form-control"
                        name="startDate"
                        value={formData.startDate}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="endDate">End Date:</label>
                    <input
                        type="date"
                        id="endDate"
                        className="form-control"
                        name="endDate"
                        value={formData.endDate}
                        onChange={handleChange}
                        required
                    />
                    {dateError && <small className="text-danger">{dateError}</small>}
                </div>
                {selectedCar && (
                    <>
                        <div className="form-group mb-3">
                            <label>Seats:</label>
                            <input
                                type="text"
                                className="form-control"
                                value={selectedCar.seats}
                                disabled
                            />
                        </div>
                        <div className="form-group mb-3">
                            <label>Transmission:</label>
                            <input
                                type="text"
                                className="form-control"
                                value={selectedCar.transmission}
                                disabled
                            />
                        </div>
                        <div className="form-group mb-3">
                            <label>Fuel:</label>
                            <input
                                type="text"
                                className="form-control"
                                value={selectedCar.fuel}
                                disabled
                            />
                        </div>
                        <div className="form-group mb-3">
                            <label>Mileage:</label>
                            <input
                                type="text"
                                className="form-control"
                                value={selectedCar.mileage}
                                disabled
                            />
                        </div>
                    </>
                )}
                <div className="form-group mb-3">
                    <label>Total Price:</label>
                    <input
                        type="text"
                        className="form-control"
                        value={`₹ ${totalPrice}`}
                        disabled
                    />
                </div>
                <button type="submit" className="btn btn-primary" disabled={isLoading}>
                    Book
                </button>
            </form>
            {message && <div className="alert alert-info mt-3">{message}</div>}
        </div>
    );
};

export default BookingCar;
