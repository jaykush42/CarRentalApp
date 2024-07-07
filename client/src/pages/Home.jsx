import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCars } from '../redux/slices/carSlice';

const Home = () => {
    const dispatch = useDispatch();
    const { cars, isLoading } = useSelector((state) => state.cars);

    useEffect(() => {
        dispatch(fetchCars());
    }, [dispatch]);

    return (
        <div>
            <h1>Available Cars</h1>
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <ul>
                    {cars.map((car) => (
                        <li key={car._id}>{car.make} {car.model} - ${car.pricePerDay}/day</li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Home;
