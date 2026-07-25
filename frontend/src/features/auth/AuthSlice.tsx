// src/store/authSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the shape of your auth state
interface AuthState {
  isAuthenticated: boolean;
  username: string | null;
  balance: number;
  loading: boolean;
  error: string | null;
  user: User | null;
}

// ✅ Define User interface
export interface User {
  id: string;
  username: string;
  email: string;
  balance: number;
  role?: "user" | "admin";
  createdAt?: string;
}

// Initial state
const initialState: AuthState = {
  isAuthenticated: false,
  username: null,
  balance: 0,
  loading: false,
  error: null,
  user: null,
};

// Create the slice
const authSlice = createSlice({
  name: "auth", // This will be the slice name in Redux state
  initialState,
  reducers: {
    // Login actions
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action: PayloadAction<User>) => {
      state.isAuthenticated = true;
      // ✅ Set individual fields
      state.username = action.payload.username;
      state.balance = action.payload.balance;
      // ✅ Set user object
      state.user = action.payload;
      state.loading = false;
      state.error = null;
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

    // Logout
    logout: (state) => {
      state.isAuthenticated = false;
      // ✅ Clear individual fields
      state.username = null;
      state.balance = 0;
      // ✅ Clear user object
      state.user = null;
      state.loading = false;
      state.error = null;
    },
    registerStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    registerSuccess: (state, action: PayloadAction<User>) => {
      state.isAuthenticated = true;
      state.username = action.payload.username;
      state.balance = action.payload.balance;
      state.user = action.payload;
      state.loading = false;
      state.error = null;
    },
    registerFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

    // Update balance
    updateBalance: (state, action: PayloadAction<number>) => {
      // ✅ Update individual field
      state.balance += action.payload;
      // ✅ Update user object
      if (state.user) {
        state.user.balance += action.payload;
      }
    },

    // Clear errors
    clearError: (state) => {
      state.error = null;
    },
  },
});

// Export actions
export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
  updateBalance,
  clearError,
  registerStart,
  registerSuccess,
  registerFailure,
} = authSlice.actions;

// Export reducer (this is what goes in the store)
export default authSlice.reducer;
