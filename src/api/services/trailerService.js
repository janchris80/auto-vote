import { getRequest, postRequest, putRequest } from '../axios/instance';

const trailerService = {
  create: async (description, trailerType, cancelToken) => {
    try {
      const response = await postRequest(`/api/trailers`, { trailerType, description }, { cancelToken: cancelToken.token });
      return response;
    } catch (error) {
      console.error('Error in trailer service creating trailer:', error);
      throw error;
    }
  },

  update: async (description, trailerType, id, cancelToken) => {
    try {
      const response = await putRequest(`/api/trailers`, { trailerType, description, id }, { cancelToken: cancelToken.token });
      return response;
    } catch (error) {
      console.error('Error in trailer service updating trailer:', error);
      throw error;
    }
  },

  getTrailer: async (trailerType, cancelToken) => {
    try {
      const response = await postRequest(`/api/trailers/get`, { trailerType }, { cancelToken: cancelToken.token });
      return response;
    } catch (error) {
      console.error('Error in trailer service getting trailer:', error);
      throw error;
    }
  },

  getPopular: async (page, trailerType, cancelToken) => {
    try {
      const response = await getRequest(`/api/popular?page=${page}&type=${trailerType}`, { cancelToken: cancelToken.token });
      return response;
    } catch (error) {
      console.error('Error in trailer service getting popular:', error);
      return error;
    }
  },

  getFollowing: async (page, trailerType, cancelToken) => {
    try {
      const response = await getRequest(`/api/following?page=${page}&type=${trailerType}`, { cancelToken: cancelToken.token });
      return response;
    } catch (error) {
      console.error('Error in trailer service getting follwing:', error);
      return error;
    }
  },

  update: async (id, isEnable, votingType, trailerType, weight, cancelToken) => {
    try {
      const response = await putRequest(`/api/follower/update`, {
        id,
        isEnable,
        votingType,
        trailerType,
        weight,
      }, { cancelToken: cancelToken.token });
      return response;
    } catch (error) {
      console.error('Error in trailer service getting popular:', error);
      return error;
    }
  },
};

export default trailerService;
