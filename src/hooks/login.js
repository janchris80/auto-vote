import axios from 'axios';
import { storeTokenInLocalStorage } from 'lib/api';
import { KeychainSDK } from "keychain-sdk";
import { login, logout } from './api';

const BASE_URL = 'http://localhost:8000'; // Define your API base URL here
const POSTING_AUTHORITY = 'Posting';
const LOGIN_REASON = 'Login using Hive';

const createAxiosInstance = () => {
  return axios.create({
    baseURL: BASE_URL,
  });
};

export const requestHiveLogin = async (username) => {
  try {
    const keychain = new KeychainSDK(window);
    if (!keychain) {
      throw new Error('Hive Keychain not found');
    }

    const response = await keychain.login({
      username: username,
      message: LOGIN_REASON,
      method: POSTING_AUTHORITY,
      title: "Auto Vote Login"
    });

    if (response) {
      console.log(response);
    }

    await logout();
    await login(username);

  } catch (error) {
    throw new Error(error.message);
  }
};


const authenticateWithServer = async (username, result) => {
  const data = {
    username: username,
    network: 'hive',
    authority_type: POSTING_AUTHORITY,
    proof: result,
  };

  try {
    const response = await login(username);
    console.log('authenticateWithServer_response', response);
    storeTokenInLocalStorage(response.data.token);
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const authMe = async () => {
  try {
    const axiosInstance = createAxiosInstance();
    const response = await axiosInstance.get('/auth/me');
    console.log('authMe_response', response);
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
}
