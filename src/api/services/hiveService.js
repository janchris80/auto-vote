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
  }
};

export default hiveService;
