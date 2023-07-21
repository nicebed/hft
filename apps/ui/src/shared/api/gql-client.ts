import { ApolloClient, InMemoryCache } from '@apollo/client';
import { config } from '../config/config';
import Cookies from 'js-cookie';

export const apolloClient = new ApolloClient({
  uri: config.API_URL,
  cache: new InMemoryCache(),
  credentials: 'include',
  headers: {
    authorization: `bearer ${Cookies.get('access')}`,
    'content-type': 'application/json',
  },
});
