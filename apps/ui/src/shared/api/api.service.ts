import { ApiService } from './types';
import { apolloClient as client } from './gql-client';

export const apiService: ApiService = {
  query: async ({ query, variables, dataMapper }) => {
    return client
      .query({ query, variables })
      .then((response) => ({
        ...response,
        data: response.data && dataMapper ? dataMapper(response.data) : response.data,
      }))
      .catch((error) => error);
  },

  mutate: async ({ mutation, variables, dataMapper }) => {
    return client
      .mutate({ mutation, variables })
      .then((response) => ({
        ...response,
        data: response.data && dataMapper ? dataMapper(response.data) : response.data,
      }))
      .catch((error) => error);
  },
};
