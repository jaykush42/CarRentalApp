import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE_URL = "https://carrentalapp-b023.onrender.com";

// Fetch bookings
export const fetchBookings = createAsyncThunk(
  "bookings/fetchBookings",
  async ({ userId, token }) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/bookings`, {
        headers: { "x-auth-token": token },
        params: { userId },
      });
      return response.data;
    } catch (error) {
      throw Error(error.response?.data?.message || "Failed to fetch bookings.");
    }
  },
);
// Fetch a single car by ID
export const fetchBookingById = createAsyncThunk(
  "bookings/fetchBookingById",
  async ({ id, token }) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/bookings/${id}`, {
        headers: { "x-auth-token": token },
      });
      return response.data;
    } catch (error) {
      throw Error(error.response?.data?.message || "Failed to fetch order.");
    }
  },
);

export const fetchBookingsByHostId = createAsyncThunk(
  "bookings/fetchBookingsByHostId",
  async ({ hostId, token }) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/api/bookings/host/${hostId}`,
        {
          headers: { "x-auth-token": token },
        },
      );
      return response.data;
    } catch (error) {
      throw Error(
        error.response?.data?.message || "Failed to fetch bookings by host.",
      );
    }
  },
);

// Add booking
export const addBooking = createAsyncThunk(
  "bookings/addBooking",
  async ({ bookingData, token }) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/bookings`,
        bookingData,
        {
          headers: { "x-auth-token": token },
        },
      );
      return response.data;
    } catch (error) {
      throw Error(error.response?.data?.message || "Failed to add booking.");
    }
  },
);

/* ===================== CHECK OVERLAP (READ ONLY) ===================== */
export const checkOverlapping = createAsyncThunk(
  "bookings/checkOverlapping",
  async ({ bookingData, token }, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${API_BASE_URL}/api/bookings/checkOverlapping`,
        bookingData,
        { headers: { "x-auth-token": token } }
      );
      return res.data; // { success, message? }
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message ||
          "Failed to check overlapping booking"
      );
    }
  }
);

// Cancel booking
export const cancelBooking = createAsyncThunk(
  "bookings/cancelBooking",
  async ({ bookingId, token }) => {
    try {
      await axios.delete(`${API_BASE_URL}/api/bookings/${bookingId}`, {
        headers: { "x-auth-token": token },
      });
      return bookingId;
    } catch (error) {
      throw Error(error.response?.data?.message || "Failed to cancel booking.");
    }
  },
);

const bookingSlice = createSlice({
  name: "bookings",
  initialState: {
    bookings: [],
    order: null,
    isBookingLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBookings.pending, (state) => {
        state.isBookingLoading = true;
        state.error = null;
      })
      .addCase(fetchBookings.fulfilled, (state, action) => {
        state.bookings = action.payload;
        state.isBookingLoading = false;
        state.error = null;
      })
      .addCase(fetchBookings.rejected, (state, action) => {
        state.isBookingLoading = false;
        state.error = action.error.message || "Failed to fetch bookings.";
      })
      .addCase(fetchBookingById.pending, (state) => {
        state.isBookingLoading = true;
        state.error = null;
      })
      .addCase(fetchBookingById.fulfilled, (state, action) => {
        state.order = action.payload;
        state.isBookingLoading = false;
        state.error = null;
      })
      .addCase(fetchBookingById.rejected, (state, action) => {
        state.isBookingLoading = false;
        state.error = action.error.message || "Failed to fetch bookings.";
      })

      .addCase(fetchBookingsByHostId.pending, (state) => {
        state.isBookingLoading = true;
        state.error = null;
      })
      .addCase(fetchBookingsByHostId.fulfilled, (state, action) => {
        state.bookings = action.payload;
        state.isBookingLoading = false;
        state.error = null;
      })
      .addCase(fetchBookingsByHostId.rejected, (state, action) => {
        state.isBookingLoading = false;
        state.error =
          action.error.message || "Failed to fetch bookings by host.";
      })

      .addCase(addBooking.pending, (state) => {
        state.isBookingLoading = true;
        state.error = null;
      })
      .addCase(addBooking.fulfilled, (state, action) => {
        state.bookings.push(action.payload);
        state.order = action.payload.booking;
        state.isBookingLoading = false;
        state.error = null;
      })
      .addCase(addBooking.rejected, (state, action) => {
        state.isBookingLoading = false;
        state.error = action.error.message || "Failed to add booking.";
      })
      /* check overlap (NO STATE CHANGE) */
      .addCase(checkOverlapping.pending, (state) => {
        state.isBookingLoading = true;
      })
      .addCase(checkOverlapping.fulfilled, (state) => {
        state.isBookingLoading = false;
      })
      .addCase(checkOverlapping.rejected, (state, action) => {
        state.isBookingLoading = false;
        state.error = action.payload;
      })
      .addCase(cancelBooking.pending, (state) => {
        state.isBookingLoading = true;
        state.error = null;
      })
      .addCase(cancelBooking.fulfilled, (state, action) => {
        state.bookings = state.bookings.filter(
          (booking) => booking._id !== action.payload,
        );
        state.isBookingLoading = false;
        state.error = null;
      })
      .addCase(cancelBooking.rejected, (state, action) => {
        state.isBookingLoading = false;
        state.error = action.error.message || "Failed to cancel booking.";
      });
  },
});

export default bookingSlice.reducer;
