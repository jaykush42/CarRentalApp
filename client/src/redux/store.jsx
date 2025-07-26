// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import authUserReducer from './slices/authUserSlice';
import authHostReducer from './slices/authHostSlice';
import carReducer from './slices/carSlice';
import bookingReducer from './slices/bookingSlice';

const store = configureStore({
    reducer: {
        authUser: authUserReducer,   
        authHost: authHostReducer,   
        cars: carReducer,
        bookings: bookingReducer,
    },
});

export default store;
