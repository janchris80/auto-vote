// auth.js
import { createSlice } from "@reduxjs/toolkit";
import authService from 'api/services/authService';
import keychainService from 'api/services/keychainService';

const initialState = {
  isLoggedIn: false,
  user: null,
  isAuthorizeApp: 0,
  accessToken: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload.user;
      state.isAuthorizeApp = action.payload.user.isEnable;
    },
    loginFailure: (state, action) => {
      state.isLoggedIn = false;
      state.user = null;
      state.isAuthorizeApp = 0;
    },
    logoutSuccess: (state, action) => {
      state.isLoggedIn = false;
      state.user = null;
    },
    updateAuthorizeStatus: (state, action) => {
      state.user.isEnable = action.payload.isEnable;
      state.isAuthorizeApp = action.payload.isEnable;
    },
    setAccessToken: (state, action) => {
      state.accessToken = action.payload.accessToken;
    },
    updateUser: (state, action) => {
      state.user = action.payload.user;
    },
  },
});

export const { loginSuccess, loginFailure, logoutSuccess, updateAuthorizeStatus, setAccessToken, updateUser } = authSlice.actions;

export const update = ({ limitPower = 0, isPause = false, isEnable = false, type, isAutoClaimReward = false }) => async (dispatch) => {
  try {
    const response = await authService.update(limitPower, isPause, isEnable, type, isAutoClaimReward);

    console.log(response);
    dispatch(updateUser({user: response}));

  } catch (error) {
    const message =
      (error.response &&
        error.response.data &&
        error.response.data.message) ||
      error.message ||
      error.toString();
    console.error(message);
    // dispatch();
  }
};

export const login = ({ username }) => async (dispatch) => {
  try {
    const response = await authService.login(username);

    dispatch(loginSuccess({ user: response }));
    dispatch(setAccessToken({ accessToken: response.accessToken }));

  } catch (error) {
    const message =
      (error.response &&
        error.response.data &&
        error.response.data.message) ||
      error.message ||
      error.toString();
    console.error(message);
    // dispatch(loginFailure());
  }
};

export const addAccountAuthority = ({ username, authorizeAccount }) => async (dispatch) => {
  try {
    const response = await keychainService.requestAddAccountAuthority(username, authorizeAccount);
    if (response.success) {
      dispatch(updateAuthorizeStatus({ isEnable: true }));
    }
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

export const removeAccountAuthority = ({ username, authorizeAccount }) => async (dispatch) => {
  try {
    const response = await keychainService.requestRemoveAccountAuthority(username, authorizeAccount);
    if (response.success) {
      dispatch(updateAuthorizeStatus({ isEnable: false }));
    }
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

export const logout = () => async (dispatch) => {
  await authService.logout();
  dispatch(logoutSuccess());
};

const authReducer = authSlice.reducer;
export default authReducer;
