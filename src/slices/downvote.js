import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import followerService from 'api/services/followerService';

const type = 'downvote';

export const popular = createAsyncThunk(
  "downvotes/popular",
  async ({ page }) => {
    try {
      const { data } = await followerService.popular(page, type);
      console.log('downvotes/popular', data);

      return {
        popularDownvotes: data?.data || [],
        popularCurrentPage: data?.meta?.current_page || 1,
        popularTotalPages: data?.meta?.last_page || 1,
      };
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.error(message);
      return thunkAPI.rejectWithValue();
    }
  }
);

export const following = createAsyncThunk(
  "downvotes/following",
  async ({ page }) => {
    try {
      const { data } = await followerService.following(page, type);
      console.log('downvotes/following', data);

      return {
        followingDownvotes: data?.data || [],
        followingCurrentPage: data?.meta?.current_page || 1,
        followingTotalPages: data?.meta?.last_page || 1,
      };
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.error(message);
      return thunkAPI.rejectWithValue();
    }
  }
);

const initialState = {
  popularDownvotes: [],
  followingDownvotes: [],

  followingCurrentPage: 1,
  followingTotalPages: 1,

  popularCurrentPage: 1,
  popularTotalPages: 1,
}

const slice = createSlice({
  name: "downvotes",
  initialState,
  extraReducers: {
    [popular.fulfilled]: (state, action) => {
      state.popularDownvotes = action.payload.popularDownvotes;
      state.popularCurrentPage = action.payload.popularCurrentPage;
      state.popularTotalPages = action.payload.popularTotalPages;
    },
    [popular.rejected]: (state, action) => {
      state.popularDownvotes = [];
      state.popularCurrentPage = 1;
      state.popularTotalPages = 1;
    },

    [following.fulfilled]: (state, action) => {
      state.followingDownvotes = action.payload.followingDownvotes;
      state.followingCurrentPage = action.payload.followingCurrentPage;
      state.followingTotalPages = action.payload.followingTotalPages;
    },
    [following.rejected]: (state, action) => {
      state.followingDownvotes = [];
      state.followingCurrentPage = 1;
      state.followingTotalPages = 1;
    },
  },
});

const { reducer } = slice;
export default reducer;
