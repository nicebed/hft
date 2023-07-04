import { combineReducers } from '@reduxjs/toolkit';
import { baseApi, baseReauthApi } from '@app/shared/api';

export const reducer = combineReducers({
  [baseApi.reducerPath]: baseApi.reducer,
  [baseReauthApi.reducerPath]: baseReauthApi.reducer,
});
