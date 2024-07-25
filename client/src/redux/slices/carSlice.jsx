import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Fetch all cars
export const fetchCars = createAsyncThunk('cars/fetchCars', async () => {
    const response = await axios.get('https://carrentalapp-b023.onrender.com/api/cars');
    return response.data;
});

// Fetch a single car by ID
export const fetchCarById = createAsyncThunk('cars/fetchCarById', async (id) => {
    const response = await axios.get(`https://carrentalapp-b023.onrender.com/api/cars/${id}`);
    return response.data;
});

// Add a car
export const addCar = createAsyncThunk('cars/addCar', async ({carData, token}) => {
    const response = await axios.post('https://carrentalapp-b023.onrender.com/api/cars', carData,
        {
            headers: { 'x-auth-token': token },
        }
    );
    return response.data;
});

// Update a car
export const updateCar = createAsyncThunk('cars/updateCar', async ({ id, carData, token }) => {
    const response = await axios.put(`https://carrentalapp-b023.onrender.com/api/cars/${id}`, carData,
        {
            headers: { 'x-auth-token': token },
        }
    );
    return response.data;
});

export const updateRating = createAsyncThunk('cars/updateRating', async ({ id, rating, token }) => {
    const response = await axios.put(`https://carrentalapp-b023.onrender.com/api/cars/${id}/rating`, {rating},
        {
            headers: { 'x-auth-token': token },
        }
    );
    return response.data;
});

// Delete a car
export const deleteCar = createAsyncThunk('cars/deleteCar', async ({id, token}) => {
    await axios.delete(`https://carrentalapp-b023.onrender.com/api/cars/${id}`,
        {
            headers: { 'x-auth-token': token },
        }
    );
    return id;
});

const carSlice = createSlice({
    name: 'cars',
    initialState: { cars: [], car: {}, isLoading: false, error: null },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCars.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchCars.fulfilled, (state, action) => {
                state.cars = action.payload;
                state.isLoading = false;
            })
            .addCase(fetchCars.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })
            .addCase(fetchCarById.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchCarById.fulfilled, (state, action) => {
                state.car = action.payload;
                state.isLoading = false;
            })
            .addCase(fetchCarById.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })
            .addCase(addCar.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(addCar.fulfilled, (state, action) => {
                state.cars.push(action.payload);
                state.isLoading = false;
            })
            .addCase(addCar.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })
            .addCase(updateCar.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateCar.fulfilled, (state, action) => {
                const index = state.cars.findIndex(car => car._id === action.payload._id);
                if (index !== -1) {
                    state.cars[index] = action.payload;
                }
                state.isLoading = false;
            })
            .addCase(updateCar.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })
            .addCase(updateRating.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateRating.fulfilled, (state, action) => {
                const index = state.cars.findIndex(car => car._id === action.payload._id);
                if (index !== -1) {
                    state.cars[index] = action.payload;
                }
                state.isLoading = false;
            })
            .addCase(updateRating.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })
            .addCase(deleteCar.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteCar.fulfilled, (state, action) => {
                state.cars = state.cars.filter(car => car._id !== action.payload);
                state.isLoading = false;
            })
            .addCase(deleteCar.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            });
    },
});

export default carSlice.reducer;
