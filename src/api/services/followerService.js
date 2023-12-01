import { postRequest } from '../axios/instance';

const followerService = {
  getPopular: (page, type) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await postRequest(`/api/popular?page=${page}`, { type });
        resolve(response);
      } catch (error) {
        console.error('Error in popular service:', error);
        reject(new Error('Failed to fetch popular data'));
      }
    });
  },

  getFollowing: (page, type) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await postRequest(`/api/following?page=${page}`, { type });
        resolve(response);
      } catch (error) {
        console.error('Error in following service:', error);
        reject(new Error('Failed to fetch following data'));
      }
    });
  },

  follow: (action, userId, trailType) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await postRequest(`/api/followers/${action}`, {
          user_id: userId,
          type: trailType, // 'curation' or 'downvote'
        });
        resolve(response);
      } catch (error) {
        console.error('Error in follow service:', error);
        reject(new Error('Failed to perform follow action'));
      }
    });
  },
};

export default followerService;
