import { postRequest, getRequest } from '../axios/instance';

const followerService = {
  popular: async (page, type) => {
    try {
      const response = await postRequest(`/api/popular?page=${page}`, { type })

      return response;
    } catch (error) {
      throw error;
    }
  },

  following: async (page, type) => {
    try {
      const response = await postRequest(`/api/following?page=${page}`, { type })

      return response;
    } catch (error) {
      throw error;
    }
  },
};

export default followerService;
