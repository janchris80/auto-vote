import { KeychainKeyTypes, KeychainSDK } from 'keychain-sdk';
import { postRequest } from '../axios/instance';
import hive from '@hiveio/hive-js';

hive.api.setOptions({ url: 'https://api.hive.blog' });

const keychain = new KeychainSDK(window);

const keychainService = {
  requestAddAccountAuthority: async (username, authorizedUsername) => {
    try {
      const formParams = {
        username,
        authorizedUsername,
        role: KeychainKeyTypes.posting,
        weight: 1,
      };

      const response = await keychain.addAccountAuthority(formParams);


      if (response.success) {
        await postRequest('api/enable');
      }

      return response;
    } catch (error) {
      throw error;
    }
  },
  requestRemoveAccountAuthority: async (username, authorizedUsername) => {
    try {
      const formParams = {
        username,
        authorizedUsername,
        role: KeychainKeyTypes.posting,
        weight: 1,
      };

      const response = await keychain.removeAccountAuthority(formParams);

      return response;
    } catch (error) {
      throw error;
    }
  },
};

export default keychainService;
