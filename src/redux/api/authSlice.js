// src/redux/api/authSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
};

// Load from localStorage if available
const savedAuth = localStorage.getItem("auth");
if (savedAuth) {
  const parsed = JSON.parse(savedAuth);
  initialState.user = parsed.user;
  initialState.token = parsed.token;
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { token, user } = action.payload;
      state.token = token;
      state.user = user;

      // persist in localStorage
      localStorage.setItem("auth", JSON.stringify({ token, user }));
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("auth");
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;

// Selectors
export const selectCurrentUser = (state) => state.auth.user;
export const selectCurrentToken = (state) => state.auth.token;
