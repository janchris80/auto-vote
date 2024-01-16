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
      if (state[action.payload.trailerType]) {
        state[action.payload.trailerType].id = action.payload.id
        state[action.payload.trailerType].description = action.payload.description
      }
    },
    updateTrailerFailure: (state, action) => {
      if (state[action.payload.trailerType]) {
        state[action.payload.trailerType].id = action.payload.id
        state[action.payload.trailerType].description = action.payload.description
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

export const getPopular = ({ page, trailerType, cancelToken }) => async (dispatch) => {

  try {
    const { data } = await trailerService.getPopular(page, trailerType, cancelToken);

    dispatch(getFollowingFailure());
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

export const getFollowing = ({ page, trailerType, cancelToken }) => async (dispatch) => {

  try {
    const { data } = await trailerService.getFollowing(page, trailerType, cancelToken);

    dispatch(getPopularFailure());
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

export const createTrailer = ({ description, trailerType, cancelToken }) => async (dispatch) => {

  try {
    const { data } = await trailerService.create(description, trailerType, cancelToken);

    dispatch(updateTrailerSuccess({
      id: data?.data?.id || null,
      description: data?.data?.description || null,
      trailerType: data?.data?.trailerType || trailerType,
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

export const updateTrailer = ({ description, trailerType, id, cancelToken }) => async (dispatch) => {

  try {
    const { data } = await trailerService.update(description, trailerType, id, cancelToken);

    dispatch(updateTrailerSuccess({
      id: data?.data?.id || null,
      description: data?.data?.description || null,
      trailerType: data?.data?.trailerType || trailerType,
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

export const getTrailer = ({ trailerType, cancelToken }) => async (dispatch) => {

  try {
    const { data } = await trailerService.getTrailer(trailerType, cancelToken);

    dispatch(updateTrailerSuccess({
      id: data?.data?.id || null,
      description: data?.data?.description || null,
      trailerType: data?.data?.trailerType || trailerType,
    }));
  } catch (error) {
    const message =
      (error.response &&
        error.response.data &&
        error.response.data.message) ||
      error.message ||
      error.toString();
    console.error(message);
    dispatch(updateTrailerFailure({ trailerType: trailerType }));
  }
};

export const updateFollowingTrail = ({ id, isEnable, votingType, trailerType, weight, communities, votingTime, cancelToken}) => async (dispatch) => {
  try {
    const { data } = await trailerService.update(id, isEnable, votingType, trailerType, weight, communities, votingTime, cancelToken);

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
