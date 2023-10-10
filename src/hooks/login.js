import axios from 'axios';
import { storeTokenInLocalStorage } from 'lib/api';
import { KeychainSDK } from "keychain-sdk";

const BASE_URL = 'http://localhost:5000'; // Define your API base URL here
const POSTING_AUTHORITY = 'Posting';
const LOGIN_REASON = 'Login using Hive';

const createAxiosInstance = () => {
  return axios.create({
    baseURL: BASE_URL,
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export const requestHiveLogin = async (username) => {
  try {
    const keychain = new KeychainSDK(window);
    if (!keychain) {
      throw new Error('Hive Keychain not found');
    }

    const response = await keychain.signBuffer({
      username: username,
      message: LOGIN_REASON,
      method: POSTING_AUTHORITY,
      title: "Hive Auto Vote Login"
    });

    await authenticateWithServer(username, response);
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
    const axiosInstance = createAxiosInstance();
    const response = await axiosInstance.post('/auth/signin', data);
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
