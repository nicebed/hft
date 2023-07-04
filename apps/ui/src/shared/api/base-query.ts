import { type BaseQueryFn } from '@reduxjs/toolkit/dist/query/baseQueryTypes';
import {
  type FetchArgs,
  type FetchBaseQueryError,
  type FetchBaseQueryMeta,
} from '@reduxjs/toolkit/dist/query/fetchBaseQuery';
import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { config } from '@app/shared/lib/config';
import Cookies from 'js-cookie';
// import { tokenService } from '../services';

export const baseQuery: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError,
  object,
  FetchBaseQueryMeta
> = fetchBaseQuery({
  baseUrl: config.API_URL,
  credentials: 'include',
  mode: 'cors',
  prepareHeaders: (headers) => {
    const access = Cookies.get('access');

    headers.set('content-type', 'application/json');
    if (access) {
      headers.set('authorization', `bearer ${access}`);
    }

    return headers;
  },
});

export const baseReauthQuery: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let incomingQueryRes = await baseQuery(args, api, extraOptions);

  if (incomingQueryRes.error && incomingQueryRes.error.status === 401) {
    const refresh = await baseQuery('refresh', api, extraOptions);
    if (refresh.data) {
      // tokenService.set(refresh.data);
      incomingQueryRes = await baseQuery(args, api, extraOptions);
    }
  }

  return incomingQueryRes;
};
