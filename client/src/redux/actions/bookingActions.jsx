import axios from 'axios';

export const getBookings = () => async (dispatch) => {
    try {
        const res = await axios.get('/api/bookings', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
        dispatch({ type: 'GET_BOOKINGS', payload: res.data });
    } catch (err) {
        dispatch({ type: 'BOOKING_ERROR', payload: err.response.data.message });
    }
};

export const addBooking = (bookingData) => async (dispatch) => {
    try {
        const res = await axios.post('/api/bookings', bookingData, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
        dispatch({ type: 'ADD_BOOKING', payload: res.data });
    } catch (err) {
        dispatch({ type: 'BOOKING_ERROR', payload: err.response.data.message });
    }
};
