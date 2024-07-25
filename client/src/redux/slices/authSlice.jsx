import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const login = createAsyncThunk('auth/login', async (userData) => {
    const response = await axios.post('https://carrentalapp-b023.onrender.com/api/auth/login', userData);
    return response.data;
});

export const signup = createAsyncThunk('auth/signup', async (userData) => {
    const response = await axios.post('https://carrentalapp-b023.onrender.com/api/auth/signup', userData);
    return response.data;
});

export const updateUserDetails = createAsyncThunk('auth/updateUserDetails', async (userData, { getState }) => {
    const { token } = getState().auth;
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    const response = await axios.put('https://carrentalapp-b023.onrender.com/api/auth/update', userData, config);
    return response.data;
});

const authSlice = createSlice({
    name: 'auth',
    initialState: { user: null, token: null, isAuthenticated: false, isLoading: false, error: null },
    reducers: {
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.isAuthenticated = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.user = action.payload.result;
                state.token = action.payload.token;
                state.isLoading = false;
                state.isAuthenticated = true;
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
                state.isAuthenticated = false;
            })
            .addCase(signup.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(signup.fulfilled, (state, action) => {
                state.user = action.payload.result;
                state.token = action.payload.token;
                state.isLoading = false;
                state.isAuthenticated = true;
            })
            .addCase(signup.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
                state.isAuthenticated = false;
            })
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
                state.error = action.error.message;
            });
    },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
