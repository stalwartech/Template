// services/axiosConfig.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

// Attach token to every request
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle expired token on every response
axiosInstance.interceptors.response.use(
  (response) => response, // request succeeded, return normally

  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid — clean up and redirect
      localStorage.removeItem("token");
      window.location.href = '/login'; // force user to log in again
      alert("Your session has expired. Please log in again.");
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;


// How to use it in every other file 
// Step 1: import axiosInstance from './axiosConfig';
// Step 2a: axiosInstance.get('/api/users'); This is to get from a database endpoint without needing of a token or an header
// Step 2b: axiosInstance.post('/api/users');
// Step 2c: axiosInstance.put('/api/users');
// Step 2d: axiosInstance.delete('/api/users');

