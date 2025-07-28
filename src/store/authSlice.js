import { createSlice } from '@reduxjs/toolkit';
import localforage from 'localforage';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: false,
    user: null,
    token: null,
  },
  reducers: {
    loginStart: (state) => {
      state.isAuthenticated = false;
    },
    loginSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
      // Сохраняем 
      localforage.setItem('auth', {
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token
      });
    },
    loginFailure: (state) => {
      state.isAuthenticated = false;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      // Очищаем localForage
      localforage.removeItem('auth');
    },
    initializeAuth: (state, action) => {
      state.isAuthenticated = action.payload.isAuthenticated;
      state.user = action.payload.user;
      state.token = action.payload.token;
    }
  },
});

export const { loginStart, loginSuccess, loginFailure, logout, initializeAuth } = authSlice.actions;
export default authSlice.reducer;