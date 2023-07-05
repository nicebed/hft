import { type ReactNode } from 'react';
import { config } from '@app/shared/lib/config';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const client = new ApolloClient({
  uri: config.API_URL,
  cache: new InMemoryCache(),
});

export const withApollo = (component: () => ReactNode) => () => {
  return <ApolloProvider client={client}>{component()}</ApolloProvider>;
};
