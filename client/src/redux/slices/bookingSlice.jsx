import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Fetch bookings
export const fetchBookings = createAsyncThunk(
    'bookings/fetchBookings',
    async ({ userId, token }) => {
        try {
            const response = await axios.get(
                'https://carrentalapp-b023.onrender.com/api/bookings',
                {
                    headers: { 'x-auth-token': token },
                    params: { userId },
                }
            );
            return response.data;
        } catch (error) {
            throw Error(error.response?.data?.message || 'Failed to fetch bookings.');
        }
    }
);
// Fetch a single car by ID
export const fetchBookingById = createAsyncThunk('bookings/fetchBookingById', async ({id, token}) => {
    try {
    const response = await axios.get(`https://carrentalapp-b023.onrender.com/api/bookings/${id}`,
        {
            headers: { 'x-auth-token': token }
        }  
    );
    // console.log(response)
    return response.data;
} catch (error) {
    throw Error(error.response?.data?.message || 'Failed to fetch order.');
}
});

// Add booking
export const addBooking = createAsyncThunk(
    'bookings/addBooking',
    async ({ bookingData, token }) => {
        try {
            const response = await axios.post(
                'https://carrentalapp-b023.onrender.com/api/bookings',
                bookingData,
                {
                    headers: { 'x-auth-token': token },
                }
            );
            return response.data;
        } catch (error) {
            throw Error(error.response?.data?.message || 'Failed to add booking.');
        }
    }
);

// Cancel booking
export const cancelBooking = createAsyncThunk(
    'bookings/cancelBooking',
    async ({ bookingId, token }) => {
        try {
            await axios.delete(
                `https://carrentalapp-b023.onrender.com/api/bookings/${bookingId}`,
                {
                    headers: { 'x-auth-token': token },
                }
            );
            return bookingId;
        } catch (error) {
            throw Error(error.response?.data?.message || 'Failed to cancel booking.');
        }
    }
);
const bookingSlice = createSlice({
    name: 'bookings',
    initialState: { bookings: [], order: null, isLoading: false, error: null },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchBookings.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchBookings.fulfilled, (state, action) => {
                state.bookings = action.payload;
                state.isLoading = false;
                state.error = null;
            })
            .addCase(fetchBookings.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || 'Failed to fetch bookings.';
            })
            .addCase(fetchBookingById.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchBookingById.fulfilled, (state, action) => {
                state.order = action.payload;
                state.isLoading = false;
                state.error = null;
            })
            .addCase(fetchBookingById.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || 'Failed to fetch bookings.';
            })
            .addCase(addBooking.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(addBooking.fulfilled, (state, action) => {
                state.bookings.push(action.payload);
                state.isLoading = false;
                state.error = null;
            })
            .addCase(addBooking.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || 'Failed to add booking.';
            })
            .addCase(cancelBooking.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(cancelBooking.fulfilled, (state, action) => {
                state.bookings = state.bookings.filter(booking => booking._id !== action.payload);
                state.isLoading = false;
                state.error = null;
            })
            .addCase(cancelBooking.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || 'Failed to cancel booking.';
            });
    },
});

export default bookingSlice.reducer;
