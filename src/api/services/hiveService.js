import { postRequest, getRequest } from '../axios/instance';
import hive from '@hiveio/hive-js';

hive.api.setOptions({ url: 'https://api.hive.blog' });

const hiveService = {
  searchUsername: async (username, trailerType) => {
    try {
      const response = await postRequest(`/api/account/search`, { username, trailerType })

      return response;
    } catch (error) {
      throw error;
    }
  },
  getAccounts: async (usernames) => {
    try {
      const response = await hive.api.getAccountsAsync(usernames);

      return response;
    } catch (error) {
      throw error;
    }
  },

  clearNotification: async (username) => {
    try {
      let date = new Date().toISOString();
      date = date.replace('Z', '');

      const json = JSON.stringify(["setLastRead", { date }])

      const operation = [
        [
          'custom_json',
          {
            'required_auths': [],
            'required_posting_auths': [username],
            'id': 'notify',
            json,
          },
        ],
      ]

      const response = window.hive_keychain.requestBroadcast(
        username,
        operation,
        'Posting',
        response => {
          if (!response.success) {
            return response.error.code
          } else {
            return response
          }
        },
      )

      console.log(result);

      return response;
    } catch (error) {
      throw error;
    }
  },

  searchCommunities: async (query) => {
    try {
      const response = await hive
        .api
        .callAsync('bridge.list_communities', {
          "query": query,
          "limit": 100
        });

      return response;
    } catch (error) {
      throw error;
    }
  },

  getListCommunities: async (last = {}) => {
    try {
      const response = await getRequest('/api/communities');
      const data = response?.data ?? [];

      // Store data and last fetch timestamp in localStorage
      localStorage.setItem('communityData', JSON.stringify(data));
      localStorage.setItem('lastFetchTimestamp', Date.now());
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  },
};

export default hiveService;
