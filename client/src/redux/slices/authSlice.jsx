import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_BASE_URL = 'https://carrentalapp-b023.onrender.com';

// Async Thunks
export const login = createAsyncThunk('auth/login', async (userData) => {
    const response = await axios.post(`${API_BASE_URL}/api/auth/login`, userData);
    return response.data;
});

export const signup = createAsyncThunk('auth/signup', async (userData) => {
    const response = await axios.post(`${API_BASE_URL}/api/auth/signup`, userData);
    return response.data;
});

export const updateUserDetails = createAsyncThunk(
    'auth/updateUserDetails',
    async (userData, { getState }) => {
        const { token } = getState().auth;
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        const response = await axios.put(`${API_BASE_URL}/api/auth/update`, userData, config);
        return response.data;
    }
);

export const changePassword = createAsyncThunk(
    'auth/changePassword',
    async (passwordData, { getState }) => {
        const { token } = getState().auth;
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        const response = await axios.put(`${API_BASE_URL}/api/auth/change-password`, passwordData, config);
        return response.data;
    }
);

// Slice
const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
    },
    reducers: {
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.isAuthenticated = false;
        },
    },
    extraReducers: (builder) => {
        builder
            // Login
            .addCase(login.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.user = action.payload.result;
                state.token = action.payload.token;
                state.isAuthenticated = true;
                state.isLoading = false;
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || 'Login failed';
                state.isAuthenticated = false;
            })
            // Signup
            .addCase(signup.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(signup.fulfilled, (state, action) => {
                state.user = action.payload.result;
                state.token = action.payload.token;
                state.isAuthenticated = true;
                state.isLoading = false;
            })
            .addCase(signup.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || 'Signup failed';
                state.isAuthenticated = false;
            })
            // Update User Details
            .addCase(updateUserDetails.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(updateUserDetails.fulfilled, (state, action) => {
                state.user = action.payload.result;
                state.isLoading = false;
            })
            .addCase(updateUserDetails.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || 'Failed to update details';
            })
            // Change Password
            .addCase(changePassword.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(changePassword.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(changePassword.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || 'Failed to change password';
            });
    },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
