import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import env from "dotenv";

const API_BASE_URL = "https://carrentalapp-b023.onrender.com";

// Signup for hosts
export const signupHost = createAsyncThunk(
  "authHost/signup",
  async (hostData) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/hosts/signup`,
        hostData
      );
      return response.data;
    } catch (error) {
      return Promise.reject(
        error.response.data.message || "Signup failed"
      );
    }
  }
);

// Login for hosts
export const loginHost = createAsyncThunk(
  "authHost/login",
  async (hostData) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/hosts/login`,
        hostData
      );
      return response.data;
    } catch (error) {
      return Promise.reject(error.response.data.message || "Login failed");
    }
  }
);

// ----------------------
// Host Updates
// ----------------------

// Update host profile details
export const updateHostDetails = createAsyncThunk(
  "authHost/updateDetails",
  async ({ updatedData, token }) => {
    try {
      const response = await axios.put(
        `${API_BASE_URL}/api/hosts/updateData`,
        updatedData,
        { headers: { "x-auth-token": token } }
      );
      return response.data;
    } catch (error) {
      return Promise.reject(
        error.response.data.message || "Failed to update details"
      );
    }
  }
);

// Update host password
export const changePassword = createAsyncThunk(
  "authHost/updatePassword",
  async ({ passwordData, token }) => {
    try {
      const response = await axios.put(
        `${API_BASE_URL}/api/hosts/change-password`,
        passwordData,
        { headers: { "x-auth-token": token } }
      );
      return response.data;
    } catch (error) {
      return Promise.reject(
        error.response.data.message || "Failed to update password"
      );
    }
  }
);

export const changeHostPin = createAsyncThunk(
  "authHost/changePin",
  async ({ pinData, token }) => {
    try {
      const response = await axios.put(
        `${API_BASE_URL}/api/hosts/change-pin`,
        pinData,
        { headers: { "x-auth-token": token } }
      );
      return response.data;
    } catch (error) {
      return Promise.reject(
        error.response.data.message || "PIN update failed"
      );
    }
  }
);

// ----------------------
// Host Slice
// ----------------------

const authHostSlice = createSlice({
  name: "authHost",
  initialState: {
    host: null,
    token: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,
  },
  reducers: {
    logoutHost: (state) => {
      state.host = null;
      state.token = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder

      // Signup
      .addCase(signupHost.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(signupHost.fulfilled, (state, action) => {
        state.host = action.payload.result;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.isLoading = false;
      })
      .addCase(signupHost.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Signup failed";
      })

      // Login
      .addCase(loginHost.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginHost.fulfilled, (state, action) => {
        state.host = action.payload.result;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.isLoading = false;
      })
      .addCase(loginHost.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Login failed";
      })

      // Update host details
      .addCase(updateHostDetails.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateHostDetails.fulfilled, (state, action) => {
        state.host = action.payload.result || action.payload;
        state.isLoading = false;
      })
      .addCase(updateHostDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Failed to update details";
      })

      // Update password
      .addCase(changePassword.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(changePassword.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Failed to update password";
      })

      .addCase(changeHostPin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(changeHostPin.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(changeHostPin.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "PIN update failed";
      });
  },
});

export const { logoutHost } = authHostSlice.actions;

export default authHostSlice.reducer;
