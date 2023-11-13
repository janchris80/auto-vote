import { configureStore } from '@reduxjs/toolkit'
import authReducer from 'slices/auth';
import curationReducer from 'slices/curation';
import downvoteReducer from 'slices/downvote';
import fanbaseReducer from 'slices/fanbase';

const reducer = {
  auth: authReducer,
  curations: curationReducer,
  fans: fanbaseReducer,
  downvotes: downvoteReducer,
}

const store = configureStore({
  reducer: reducer,
  devTools: true,
})

export default store;
