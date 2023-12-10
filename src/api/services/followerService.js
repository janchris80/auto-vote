import { postRequest } from '../axios/instance';

const followerService = {
  follow: async (userId, trailerType) => {
    try {
      const response = await postRequest(`/api/followers/follow`, {
        userId: userId,
        trailerType: trailerType, // 'curation' or 'downvote'
      });
      return response;
    } catch (error) {
      console.error('Error in follow service:', error);
      throw Error('Failed to perform follow action');
    }
  },

  unfollow: async (userId, trailerType) => {
    try {
      const response = await postRequest(`/api/followers/unfollow`, {
        userId: userId,
        trailerType: trailerType, // 'curation' or 'downvote'
      });
      return response;
    } catch (error) {
      console.error('Error in unfollow service:', error);
      throw Error('Failed to perform unfollow action');
    }
  },

  getFollowers: async(username, trailerType) => {
    try {
      const response = await postRequest(`/api/user/followers`, {
        username: username,
        trailerType: trailerType, // 'curation' or 'downvote'
      });
      return response;
    } catch (error) {
      console.error('Error in getFollowers service:', error);
      throw Error('Failed to perform getFollowers action');
    }
  }
};

export default followerService;
