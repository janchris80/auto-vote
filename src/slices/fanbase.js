import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import followerService from 'api/services/followerService';

const type = 'fanbase';

export const popular = createAsyncThunk(
  "fans/popular",
  async ({ page }, thunkAPI) => {
    try {
      const { data } = await followerService.getPopular(page, type);
      console.log('fans/popular', data);

      return {
        popularFanbase: data?.data || [],
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
  "fans/following",
  async ({ page }, thunkAPI) => {
    try {
      const { data } = await followerService.getFollowing(page, type);
      console.log('fans/following', data);

      return {
        followingFanbase: data?.data || [],
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
  popularFanbase: [],
  followingFanbase: [],

  followingCurrentPage: 1,
  followingTotalPages: 1,

  popularCurrentPage: 1,
  popularTotalPages: 1,
}

const slice = createSlice({
  name: "fanbase",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(popular.fulfilled, (state, action) => {
        state.popularFanbase = action.payload.popularFanbase;
        state.popularCurrentPage = action.payload.popularCurrentPage;
        state.popularTotalPages = action.payload.popularTotalPages;
      })
      .addCase(popular.rejected, (state, action) => {
        state.popularFanbase = [];
        state.popularCurrentPage = 1;
        state.popularTotalPages = 1;
      })
      .addCase(following.fulfilled, (state, action) => {
        state.followingFanbase = action.payload.followingFanbase;
        state.followingCurrentPage = action.payload.followingCurrentPage;
        state.followingTotalPages = action.payload.followingTotalPages;
      })
      .addCase(following.rejected, (state, action) => {
        state.followingFanbase = [];
        state.followingCurrentPage = 1;
        state.followingTotalPages = 1;
      });
  },
});

const { reducer } = slice;
export default reducer;
