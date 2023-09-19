// api.js

import axios from 'axios';

const BASE_URL = 'http://localhost:5000'; // Replace with your backend server URL

export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${BASE_URL}/register`, userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const loginUser = async (userData) => {
  try {
    const response = await axios.get(`${BASE_URL}/authenticate`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
