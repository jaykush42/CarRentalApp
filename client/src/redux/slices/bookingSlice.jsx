// redux/slices/bookingSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchBookings = createAsyncThunk(
    'bookings/fetchBookings',
    async ({ userId, token }) => {
        try {
            const response = await axios.get(
                'http://localhost:5000/api/bookings',
                {
                    headers: {
                        'x-auth-token': token,
                    },
                    params: {
                        userId: userId,
                    }
                }
            );
            return response.data;
        } catch (error) {
            throw Error(error.response?.data?.message || 'Failed to fetch bookings.');
        }
    }
);

export const cancelBooking = createAsyncThunk(
    'bookings/cancelBooking',
    async ({ bookingId, token }) => {
        try {
            await axios.delete(
                `http://localhost:5000/api/bookings/${bookingId}`,
                {
                    headers: {
                        'x-auth-token': token,
                    }
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
    initialState: { bookings: [], isLoading: false, error: null },
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
