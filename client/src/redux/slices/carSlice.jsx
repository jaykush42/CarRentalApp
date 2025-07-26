// src/redux/slices/carSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_API_URL = 'http://localhost:5000';

// Helper for headers
const authHeaders = (token) => ({
  headers: { 'x-auth-token': token },
});

// ---------------- HOST ONLY ----------------
export const fetchHostCars = createAsyncThunk('cars/fetchHostCars', async ({ hostId, token }) => {
  
  const res = await axios.get(`${BASE_API_URL}/api/cars/host/${hostId}`, authHeaders(token));
  return res.data;
});

export const fetchHostCarById = createAsyncThunk('cars/fetchHostCarById', async ({ hostId, id, token }) => {
  const res = await axios.get(`${BASE_API_URL}/api/cars/host/${hostId}/${id}`, authHeaders(token));
  return res.data;
});

export const addCar = createAsyncThunk('cars/addCar', async ({ hostId, carData, token }) => {
  const res = await axios.post(`${BASE_API_URL}/api/cars/host/${hostId}`, carData, authHeaders(token));
  return res.data;
});

export const updateCar = createAsyncThunk('cars/updateCar', async ({ hostId, id, carData, token }) => {
  const res = await axios.put(`${BASE_API_URL}/api/cars/host/${hostId}/${id}`, carData, authHeaders(token));
  return res.data;
});

export const updateStatus = createAsyncThunk('cars/updateStatus', async ({ hostId, id, field, value, token }) => {
  const data = { field, value };
  const res = await axios.put(`${BASE_API_URL}/api/cars/status/host/${hostId}/${id}`, data, authHeaders(token));
  return res.data;
});

export const deleteCar = createAsyncThunk('cars/deleteCar', async ({ hostId, carId, token }) => {
  await axios.delete(`${BASE_API_URL}/api/cars/host/${hostId}/${carId}`, authHeaders(token));
  return carId;
});

// ---------------- USER PUBLIC ----------------
export const discoverCars = createAsyncThunk('cars/discoverCars', async ({ filterData = {}, token = null }) => {
  const headers = token ? authHeaders(token) : {};
  const res = await axios.post(`${BASE_API_URL}/api/cars/search`, filterData, headers);
  return res.data;
});

export const fetchAllCars = createAsyncThunk('cars/fetchAllCars', async () => {
  const res = await axios.get(`${BASE_API_URL}/api/cars`);
  return res.data;
});

export const fetchCarById = createAsyncThunk('cars/fetchCarById', async (id) => {
  const res = await axios.get(`${BASE_API_URL}/api/cars/${id}`);
  return res.data;
});

export const updateRating = createAsyncThunk('cars/updateRating', async ({ id, updatedRating, token }) => {
  const res = await axios.put(`${BASE_API_URL}/api/cars/${id}/rating`, { updatedRating }, authHeaders(token));
  return res.data;
});

// ---------------- SLICE ----------------
const carSlice = createSlice({
  name: 'cars',
  initialState: {
    cars: [],
    car: {},
    isCarLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchHostCars.fulfilled, (state, action) => {
        state.cars = action.payload;
        state.isCarLoading = false;
      })
      .addCase(addCar.fulfilled, (state, action) => {
        state.cars.push(action.payload);
        state.isCarLoading = false;
      })
      .addCase(updateCar.fulfilled, (state, action) => {
        const i = state.cars.findIndex((c) => c._id === action.payload._id);
        if (i !== -1) state.cars[i] = action.payload;
        state.isCarLoading = false;
      })
      .addCase(deleteCar.fulfilled, (state, action) => {
        state.cars = state.cars.filter((c) => c._id !== action.payload);
        state.isCarLoading = false;
      })

      .addCase(discoverCars.fulfilled, (state, action) => {
        state.cars = action.payload;
        state.isCarLoading = false;
      })
      .addCase(fetchAllCars.fulfilled, (state, action) => {
        state.cars = action.payload;
        state.isCarLoading = false;
      })
      .addCase(fetchCarById.fulfilled, (state, action) => {
        state.car = action.payload;
        state.isCarLoading = false;
      })
      .addCase(updateRating.fulfilled, (state, action) => {
        const i = state.cars.findIndex((c) => c._id === action.payload._id);
        if (i !== -1) state.cars[i] = action.payload;
        state.isCarLoading = false;
      })

      // Handle loading & error globally
      .addMatcher((action) => action.type.endsWith('/pending'), (state) => {
        state.isCarLoading = true;
        state.error = null;
      })
      .addMatcher((action) => action.type.endsWith('/rejected'), (state, action) => {
        state.isCarLoading = false;
        state.error = action.error.message;
      });
  },
});

export default carSlice.reducer;
