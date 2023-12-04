import { createSlice } from "@reduxjs/toolkit";
import trailerService from 'api/services/trailerService';

const initialState = {
  followingTrailers: [],
  followingCurrentPage: 1,
  followingTotalPages: 1,

  popularTrailers: [],
  popularCurrentPage: 1,
  popularTotalPages: 1,

  curation: {
    id: null,
    description: null,
  },

  downvote: {
    id: null,
    description: null,
  },

  fanbase: {
    id: null,
    description: null,
  },
};

const trailerSlice = createSlice({
  name: "trailers",
  initialState,
  reducers: {
    getPopularSuccess: (state, action) => {
      state.popularTrailers = action.payload.popularTrailers;
      state.popularCurrentPage = action.payload.popularCurrentPage;
      state.popularTotalPages = action.payload.popularTotalPages;
    },
    getPopularFailure: (state, action) => {
      state.popularTrailers = [];
      state.popularCurrentPage = 1;
      state.popularTotalPages = 1;
    },
    getFollowingSuccess: (state, action) => {
      state.followingTrailers = action.payload.followingTrailers;
      state.followingCurrentPage = action.payload.followingCurrentPage;
      state.followingTotalPages = action.payload.followingTotalPages;
    },
    getFollowingFailure: (state, action) => {
      state.followingTrailers = [];
      state.followingCurrentPage = 1;
      state.followingTotalPages = 1;
    },
    updateTrailerSuccess: (state, action) => {
      if (state[action.payload.type]) {
        state[action.payload.type].id = action.payload.id
        state[action.payload.type].description = action.payload.description
      }
    },
    updateTrailerFailure: (state, action) => {
      if (state[action.payload.type]) {
        state[action.payload.type].id = action.payload.id
        state[action.payload.type].description = action.payload.description
      }
    },
  },
});

export const {
  getPopularSuccess,
  getPopularFailure,
  getFollowingSuccess,
  getFollowingFailure,
  updateTrailerSuccess,
  updateTrailerFailure,
} = trailerSlice.actions;

export const getPopular = ({ page, type, cancelToken }) => async (dispatch) => {

  try {
    const { data } = await trailerService.getPopular(page, type, cancelToken);

    dispatch(getPopularSuccess({
      popularTrailers: data.data,
      popularCurrentPage: data?.meta?.current_page,
      popularTotalPages: data?.meta?.last_page,
    }));
  } catch (error) {
    const message =
      (error.response &&
        error.response.data &&
        error.response.data.message) ||
      error.message ||
      error.toString();
    console.error(message);
    dispatch(getPopularFailure());
  }
};

export const getFollowing = ({ page, type, cancelToken }) => async (dispatch) => {

  try {
    const { data } = await trailerService.getFollowing(page, type, cancelToken);

    dispatch(getFollowingSuccess({
      followingTrailers: data.data,
      followingCurrentPage: data?.meta?.current_page,
      followingTotalPages: data?.meta?.last_page,
    }));
  } catch (error) {
    const message =
      (error.response &&
        error.response.data &&
        error.response.data.message) ||
      error.message ||
      error.toString();
    console.error(message);
    dispatch(getFollowingFailure());
  }
};

export const createTrailer = ({ description, type, cancelToken }) => async (dispatch) => {

  try {
    const { data } = await trailerService.create(description, type, cancelToken);

    dispatch(updateTrailerSuccess({
      id: data?.data?.id || null,
      description: data?.data?.description || null,
      type: data?.data?.type || type,
    }));
  } catch (error) {
    const message =
      (error.response &&
        error.response.data &&
        error.response.data.message) ||
      error.message ||
      error.toString();
    console.error(message);
    dispatch(updateTrailerFailure());
  }
};

export const updateTrailer = ({ description, type, id, cancelToken }) => async (dispatch) => {

  try {
    const { data } = await trailerService.update(description, type, id, cancelToken);

    dispatch(updateTrailerSuccess({
      id: data?.data?.id || null,
      description: data?.data?.description || null,
      type: data?.data?.type || type,
    }));
  } catch (error) {
    const message =
      (error.response &&
        error.response.data &&
        error.response.data.message) ||
      error.message ||
      error.toString();
    console.error(message);
    dispatch(updateTrailerFailure());
  }
};

export const getTrailer = ({ type, cancelToken }) => async (dispatch) => {

  try {
    const { data } = await trailerService.getTrailer(type, cancelToken);

    dispatch(updateTrailerSuccess({
      id: data?.data?.id || null,
      description: data?.data?.description || null,
      type: data?.data?.type || type,
    }));
  } catch (error) {
    const message =
      (error.response &&
        error.response.data &&
        error.response.data.message) ||
      error.message ||
      error.toString();
    console.error(message);
    dispatch(updateTrailerFailure({ type: type }));
  }
};

export const updateFollowingTrail = ({
  id, isEnable, votingType, type, weight, afterMin, dailyLimit, limitLeft, cancelToken
}) => async (dispatch) => {

  try {
    const { data } = await trailerService.update(
      id, isEnable, votingType, type, weight, afterMin, dailyLimit, limitLeft, cancelToken
    );

  } catch (error) {
    const message =
      (error.response &&
        error.response.data &&
        error.response.data.message) ||
      error.message ||
      error.toString();
    console.error(message);
  }
};


const trailerReducer = trailerSlice.reducer;
export default trailerReducer;
