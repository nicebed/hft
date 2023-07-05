import { ApolloClient, InMemoryCache } from '@apollo/client';
import { config } from '../lib/config';

export const apolloClient = new ApolloClient({
  uri: config.API_URL,
  cache: new InMemoryCache(),
});
