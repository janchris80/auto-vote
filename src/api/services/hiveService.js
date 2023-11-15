import { postRequest, getRequest } from '../axios/instance';

const hiveService = {
  searchUsername: async (username) => {
    try {
      const response = await postRequest(`/api/account/search`, { username })

      return response;
    } catch (error) {
      throw error;
    }
  },
};

export default hiveService;
