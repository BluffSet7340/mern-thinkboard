import { create } from "zustand";
import axios from "axios";

const API_URL = "http://localhost:5001/api/auth";
// this will contain all our state and functions for auth management

axios.defaults.withCredentials = true;
// ensure that authentication cookies are sent with every HTTP request
// nice way to protect the backend routes ygm

// the function takes the setter as the argument
export const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  error: null,
  isLoading: false,
  isCheckingAuth: true, // depending on whether user is signed up or logged in, show the appropriate pages
  message: null,

  signup: async (email, password, name) => {
    set({ isLoading: true, error: null });
    try {
      // first argument is url second argument is the data to be sent
      const response = await axios.post(`${API_URL}/signup`, {
        email,
        password,
        name,
      });
      // returns the user in the response
      set({
        user: response.data.user,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error.response.data.message || "Error signing up",
        isLoading: false,
      });
      throw error;
    }
  },

  login: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/login`, { email, password });
      set({
        user: response.data.user,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      set({ error: error.response.data.message || "Error logging in", isLoading: false });
      throw error;
    }
  },

  logout: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/logout`);
      set({
        user: null,
        isAuthenticated: false,
        isLoading: false,
      });
    } catch (error) {
      set({ error: error.response?.data?.message || "Error loggin in", isLoading: false });
      throw error;
    }
  },


  verifyEmail: async (sixDigitCode) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/verify-email`, {
        sixDigitCode,
      });
      set({
        user: response.data.user,
        isAuthenticated: true,
        isLoading: false,
      });
      return response.data;
    } catch (error) {
      set({
        error: error.response.data.message || "Verification failed",
        isLoading: false,
      });
      throw error;
    }
  },

  checkAuth: async () => {
    set({ isCheckingAuth: true, error: null });
    try {
      const response = await axios.get(`${API_URL}/check-auth`);
      set({
        user: response.data.user,
        isAuthenticated: true,
        isCheckingAuth: false,
      });
    } catch (error) {
      set({ error: null, isCheckingAuth: false, isAuthenticated: false });
    }
  },

  
  forgotPassword: async (email) => {
    set({ isLoading: true, error: null, message: null });
    try {
      const res = await axios.post(`${API_URL}/forgot-password`, {email});
      set({
        message: res.data.message,
        isLoading: false
      });
    } catch (error) {
      set({ error: error.res?.data?.message || "Error in trying to reset password", isLoading: false });
      throw error;
    }
  },
}));
