import axios from 'axios';
import {
    GET_CARS,
    ADD_CAR,
    UPDATE_CAR,
    DELETE_CAR
} from './types';

// Get all cars
export const getCars = () => async dispatch => {
    try {
        const res = await axios.get('/api/cars');
        dispatch({
            type: GET_CARS,
            payload: res.data
        });
    } catch (err) {
        console.error(err);
    }
};

// Add car
export const addCar = (carData, history) => async dispatch => {
    try {
        const res = await axios.post('/api/cars', carData);
        dispatch({
            type: ADD_CAR,
            payload: res.data
        });
        history.push('/cars'); // Redirect to cars list after adding
    } catch (err) {
        console.error(err);
    }
};

// Update car
export const updateCar = (id, carData, history) => async dispatch => {
    try {
        const res = await axios.put(`/api/cars/${id}`, carData);
        dispatch({
            type: UPDATE_CAR,
            payload: res.data
        });
        history.push('/cars'); // Redirect to cars list after updating
    } catch (err) {
        console.error(err);
    }
};

// Delete car
export const deleteCar = (id) => async dispatch => {
    try {
        await axios.delete(`/api/cars/${id}`);
        dispatch({
            type: DELETE_CAR,
            payload: id
        });
    } catch (err) {
        console.error(err);
    }
};
