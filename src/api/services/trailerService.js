import { postRequest, putRequest } from '../axios/instance';

const trailerService = {
  create: async (description, type, cancelToken) => {
    try {
      const response = await postRequest(`/api/trailers`, { type, description }, { cancelToken: cancelToken.token });
      return response;
    } catch (error) {
      console.error('Error in trailer service creating trailer:', error);
      throw error;
    }
  },

  update: async (description, type, id, cancelToken) => {
    try {
      const response = await putRequest(`/api/trailers`, { type, description, id }, { cancelToken: cancelToken.token });
      return response;
    } catch (error) {
      console.error('Error in trailer service updating trailer:', error);
      throw error;
    }
  },

  getTrailer: async (type, cancelToken) => {
    try {
      const response = await postRequest(`/api/trailers/get`, { type }, { cancelToken: cancelToken.token });
      return response;
    } catch (error) {
      console.error('Error in trailer service getting trailer:', error);
      throw error;
    }
  },

  getPopular: async (page, type, cancelToken) => {
    try {
      const response = await postRequest(`/api/popular?page=${page}`, { type }, { cancelToken: cancelToken.token });
      return response;
    } catch (error) {
      console.error('Error in trailer service getting popular:', error);
      return error;
    }
  },

  getFollowing: async (page, type, cancelToken) => {
    try {
      const response = await postRequest(`/api/following?page=${page}`, { type }, { cancelToken: cancelToken.token });
      return response;
    } catch (error) {
      console.error('Error in trailer service getting popular:', error);
      return error;
    }
  },

  updateStatus: async (id, status, method, type, weight, waitTime, dailyLeft = 5, limitLeft = 5, cancelToken) => {
    try {
      const response = await putRequest(`/api/follower/update`, {
        id,
        status,
        method,
        type,
        weight,
        waitTime,
        dailyLeft,
        limitLeft
      }, { cancelToken: cancelToken.token });
      return response;
    } catch (error) {
      console.error('Error in trailer service getting popular:', error);
      return error;
    }
  },
};

export default trailerService;
