import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchBookings = createAsyncThunk('bookings/fetchBookings', async () => {
    const response = await axios.get('http://localhost:5000/api/bookings');
    return response.data;
});

const bookingSlice = createSlice({
    name: 'bookings',
    initialState: { bookings: [], isLoading: false, error: null },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchBookings.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchBookings.fulfilled, (state, action) => {
                state.bookings = action.payload;
                state.isLoading = false;
            })
            .addCase(fetchBookings.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            });
    },
});

export default bookingSlice.reducer;
