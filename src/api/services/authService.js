// api/services/authService.js

import { KeychainSDK } from 'keychain-sdk';
import axios from '../axios/instance';

const LOGIN_URL = '/api/login';
const LOGOUT_URL = '/api/logout';
const USER_INFO_URL = '/api/user';

const POSTING_AUTHORITY = 'Posting';
const LOGIN_REASON = 'Login using Hive';

const authService = {
  login: async (username) => {
    try {
      const keychain = new KeychainSDK(window, { rpc: 'https://rpc.d.buzz/' });

      const isInstalled = await keychain.isKeychainInstalled();

      if (!isInstalled) {
        throw new Error('Hive Keychain not found');
      }

      const hiveUser = await keychain.login({
        username: username,
        message: LOGIN_REASON,
        method: POSTING_AUTHORITY,
        title: "Auto Vote Login"
      });

      if (!hiveUser?.success) {
        throw new Error('Something went wrong');
      }

      const login = await axios.post(LOGIN_URL, {username})

      const accessToken = login?.data?.data?.token;

      let data = {
        username,
        accessToken,
        hiveUser,
        userData: login?.data?.data?.user || [],
      };

      localStorage.setItem("user", JSON.stringify(data));

      return data;

    } catch (error) {
      throw error;
    }
  },

  logout: async () => {
    try {
      // await axios.get('/sanctum/csrf-cookie')
      const { accessToken } = JSON.parse(localStorage.getItem("user"));

      const response = await axios.post(
        LOGOUT_URL,
        {},
        {
          headers: {
            'Authorization': `Bearer ${accessToken}`, // Include the bearer token
          },
        }
      );

      // Handle the logout response if needed
      if (response) {
        localStorage.removeItem("user");
      }
    } catch (error) {
      throw error;
    }
  },

  getUserInfo: async () => {
    try {
      // await axios.get('/sanctum/csrf-cookie')
      const response = await axios.get(USER_INFO_URL);
      return response?.data?.data?.user;
    } catch (error) {
      throw error;
    }
  },
};

export default authService;