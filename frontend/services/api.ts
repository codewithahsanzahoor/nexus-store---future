import axios from 'axios';
import { store } from '../store/store';

// Base API URL from environment variables
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor: Automatic Auth Token
api.interceptors.request.use(
  (config) => {
    const state = store.getState();
    const token = state.auth.token;
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor: Basic Error Handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Optional: Global error handling (e.g., logout on 401)
    if (error.response?.status === 401) {
      // Logic for token expiration could go here
    }
    return Promise.reject(error);
  }
);

export default api;
