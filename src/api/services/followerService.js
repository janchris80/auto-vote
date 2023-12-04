import { postRequest } from '../axios/instance';

const followerService = {
  getPopular: async (page, type) => {
    try {
      const response = await postRequest(`/api/popular?page=${page}`, { type });
      return response;
    } catch (error) {
      console.error('Error in popular service:', error);
      throw Error('Failed to fetch popular data');
    }
  },

  getFollowing: async (page, type) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await postRequest(`/api/following?page=${page}`, { type });
        return response;
      } catch (error) {
        console.error('Error in following service:', error);
        throw Error('Failed to fetch following data');
      }
    });
  },

  follow: async (userId, trailType) => {
    try {
      const response = await postRequest(`/api/followers/follow`, {
        userId: userId,
        type: trailType, // 'curation' or 'downvote'
      });
      return response;
    } catch (error) {
      console.error('Error in follow service:', error);
      throw Error('Failed to perform follow action');
    }
  },

  unfollow: async (userId, trailType) => {
    try {
      const response = await postRequest(`/api/followers/unfollow`, {
        userId: userId,
        type: trailType, // 'curation' or 'downvote'
      });
      return response;
    } catch (error) {
      console.error('Error in follow service:', error);
      throw Error('Failed to perform follow action');
    }
  },
};

export default followerService;
