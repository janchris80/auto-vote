import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import followerService from 'api/services/followerService';

const type = 'curation';

export const popular = createAsyncThunk(
  "curations/popular",
  async ({ page }, thunkAPI) => {
    try {
      const { data } = await followerService.popular(page, type);
      console.log('curations/popular', data);

      return {
        popularCurations: data?.data || [],
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
  "curations/following",
  async ({ page }, thunkAPI) => {
    try {
      const { data } = await followerService.following(page, type);
      console.log('curations/following', data);

      return {
        followingCurations: data?.data || [],
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
  popularCurations: [],
  followingCurations: [],

  followingCurrentPage: 1,
  followingTotalPages: 1,

  popularCurrentPage: 1,
  popularTotalPages: 1,
}

const slice = createSlice({
  name: "curations",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(popular.fulfilled, (state, action) => {
        state.popularCurations = action.payload.popularCurations;
        state.popularCurrentPage = action.payload.popularCurrentPage;
        state.popularTotalPages = action.payload.popularTotalPages;
      })
      .addCase(popular.rejected, (state, action) => {
        state.popularCurations = [];
        state.popularCurrentPage = 1;
        state.popularTotalPages = 1;
      })
      .addCase(following.fulfilled, (state, action) => {
        state.followingCurations = action.payload.followingCurations;
        state.followingCurrentPage = action.payload.followingCurrentPage;
        state.followingTotalPages = action.payload.followingTotalPages;
      })
      .addCase(following.rejected, (state, action) => {
        state.followingCurations = [];
        state.followingCurrentPage = 1;
        state.followingTotalPages = 1;
      });
  },
});

const { reducer } = slice;
export default reducer;
