import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery, baseReauthQuery } from './base-query';

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery,
  endpoints: () => ({}),
});

export const baseReauthApi = createApi({
  reducerPath: 'reauthApi',
  baseQuery: baseReauthQuery,
  endpoints: () => ({}),
});
