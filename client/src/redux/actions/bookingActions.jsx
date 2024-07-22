import axios from 'axios';
import { useSelector } from 'react-redux';


export const getBookings = () => async (dispatch) => {
    const { user } = useSelector((state) => state.auth);

    try {
        const res = await axios.get('/api/bookings',{
            userId: user._id
        }, {
           headers: {
                        'x-auth-token':token,
                    },
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
                        'x-auth-token':token,
                    },
        });
        dispatch({ type: 'ADD_BOOKING', payload: res.data });
    } catch (err) {
        dispatch({ type: 'BOOKING_ERROR', payload: err.response.data.message });
    }
};
