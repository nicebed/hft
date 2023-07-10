import { type ReactNode } from 'react';
import { ApolloProvider } from '@apollo/client';
import { apolloClient } from '@app/shared/api';

export const withApollo = (component: () => ReactNode) => () => {
  return <ApolloProvider client={apolloClient}>{component()}</ApolloProvider>;
};
