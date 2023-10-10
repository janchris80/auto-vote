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
    const response = await axios.get(`${BASE_URL}/auth/signin`);
    return response.data;
  } catch (error) {
    throw error;
  }
};


export function storeTokenInLocalStorage(token) {
  localStorage.setItem('token', token);
}

export function getTokenFromLocalStorage() {
  return localStorage.getItem('token');
}

export const getAuthenticatedUser = async () => {
  const defaultReturnObject = { authenticated: false };
  try {
    const token = getTokenFromLocalStorage();
    if (!token) {
      return defaultReturnObject;
    }
    const response = await axios({
      method: 'GET',
      url: `${BASE_URL}/auth/me`,
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    return response.data;
  }
  catch (err) {
    console.log('getAuthenticatedUser, Something Went Wrong', err);
    return defaultReturnObject;
  }
}