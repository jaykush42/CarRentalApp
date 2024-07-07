import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCars } from '../redux/slices/carSlice';
import axios from 'axios';

const ManageCars = () => {
    const dispatch = useDispatch();
    const { cars, isLoading } = useSelector((state) => state.cars);
    const [carData, setCarData] = useState({ make: '', model: '', year: '', pricePerDay: '' });

    useEffect(() => {
        dispatch(fetchCars());
    }, [dispatch]);

    const handleChange = (e) => setCarData({ ...carData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.post('http://localhost:5000/api/cars', carData);
        dispatch(fetchCars());
        setCarData({ make: '', model: '', year: '', pricePerDay: '' });
    };

    return (
        <div>
            <h1>Manage Cars</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" name="make" placeholder="Make" value={carData.make} onChange={handleChange} required />
                <input type="text" name="model" placeholder="Model" value={carData.model} onChange={handleChange} required />
                <input type="number" name="year" placeholder="Year" value={carData.year} onChange={handleChange} required />
                <input type="number" name="pricePerDay" placeholder="Price per day" value={carData.pricePerDay} onChange={handleChange} required />
                <button type="submit">Add Car</button>
            </form>
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <ul>
                    {cars.map((car) => (
                        <li key={car._id}>
                            {car.make} {car.model} - ${car.pricePerDay}/day
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ManageCars;
