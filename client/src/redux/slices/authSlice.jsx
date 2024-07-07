import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const login = createAsyncThunk('auth/login', async (userData) => {
    const response = await axios.post('http://localhost:5000/api/auth/login', userData);
    return response.data;
});

export const signup = createAsyncThunk('auth/signup', async (userData) => {
    const response = await axios.post('http://localhost:5000/api/auth/signup', userData);
    return response.data;
});

const authSlice = createSlice({
    name: 'auth',
    initialState: { user: null, token: null, isLoading: false, error: null },
    reducers: {
        logout: (state) => {
            state.user = null;
            state.token = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.user = action.payload.result;
                state.token = action.payload.token;
                state.isLoading = false;
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })
            .addCase(signup.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(signup.fulfilled, (state, action) => {
                state.user = action.payload.result;
                state.token = action.payload.token;
                state.isLoading = false;
            })
            .addCase(signup.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            });
    },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
