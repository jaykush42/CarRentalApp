// src/redux/slices/authUserSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE_URL = "https://carrentalapp-b023.onrender.com";


// Signup
export const signupUser = createAsyncThunk(
  "authUser/signup",
  async (userData) => {
   try {
     const response = await axios.post(
      `${API_BASE_URL}/api/users/signup`,
      userData
    );
    return response.data;
   } catch (error) {
    return Promise.reject(
      error.response.data.message || "Signup failed"
    );
   }
  }
);

// Login
export const loginUser = createAsyncThunk(
  "authUser/login",
  async (userData) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/users/login`,
        userData
      );
      return response.data;
    } catch (error) {
      return Promise.reject(error.response.data.message || "Login failed");
    }
  }
);

// Update user profile
export const updateUserDetails = createAsyncThunk(
  "authUser/updateUserDetails",
  async (userData, { getState }) => {
    try {
      const { token } = getState().authUser;
      const response = await axios.put(
        `${API_BASE_URL}/api/users/update`,
        userData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (error) {
      return Promise.reject(error.response.data.message || "Update failed");
    }
  }
);

// Change password
export const changePassword = createAsyncThunk(
  "authUser/changePassword",
  async (passwordData, { getState }) => {
    try {
      const { token } = getState().authUser;
      const response = await axios.put(
        `${API_BASE_URL}/api/users/change-password`,
        passwordData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (error) {
      return Promise.reject(
        error.response.data.message || "Password change failed"
      );
    }
  }
);

const authUserSlice = createSlice({
  name: "authUser",
  initialState: {
    user: null,
    token: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,
  },
  reducers: {
    logoutUser: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Signup
      .addCase(signupUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.user = action.payload.result;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.isLoading = false;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Signup failed";
      })

      // Login
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload.result;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.isLoading = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Login failed";
      })

      // Update profile
      .addCase(updateUserDetails.fulfilled, (state, action) => {
        state.user = action.payload.result;
      })

      // Change password
      .addCase(changePassword.fulfilled, (state) => {
        state.isLoading = false;
      });
  },
});

export const { logoutUser } = authUserSlice.actions;
export default authUserSlice.reducer;
