import { configureStore } from '@reduxjs/toolkit';
import { baseApi, baseReauthApi } from '@app/shared/api';
import { reducer } from './reducer';
import { setupListeners } from '@reduxjs/toolkit/dist/query';

export const makeStore = () => {
  const store = configureStore({
    reducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(baseApi.middleware).concat(baseReauthApi.middleware),
  });

  setupListeners(store.dispatch);

  return store;
};

export const appStore = makeStore();
