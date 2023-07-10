// import {
//   ApolloClient,
//   ApolloQueryResult,
//   InMemoryCache,
//   SingleExecutionResult,
//   TypedDocumentNode,
//   gql,
// } from '@apollo/client';
// import { ApiResponse } from '@app/shared/api';
// import { config } from '@app/shared/lib/config';
// import util from 'util';

// describe('gql api service playground', () => {
//   const client = new ApolloClient({
//     uri: config.API_URL,
//     cache: new InMemoryCache(),
//   });
//   it('build gql api service', async () => {
//     type BaseOperationParams<P, R> = {
//       variables?: P;
//       dataMapper?: (data: any) => R;
//     };

//     type BaseData = Record<string, unknown> | undefined;

//     // -----------
//     type QueryParams<P, R> = {
//       query: TypedDocumentNode<Record<string, unknown>>;
//     } & BaseOperationParams<P, R>;

//     type Query = <P extends BaseData | undefined, R>({
//       query,
//       variables,
//       dataMapper,
//     }: QueryParams<P, R>) => Promise<ApolloQueryResult<R>>;

//     // -----------
//     type MutateParams<P, R> = {
//       mutation: TypedDocumentNode<Record<string, unknown>>;
//     } & BaseOperationParams<P, R>;

//     type Mutate = <P extends BaseData, R extends ApiResponse>({
//       mutation,
//       variables,
//       dataMapper,
//     }: MutateParams<P, R>) => Promise<SingleExecutionResult<R>>;

//     // -----------
//     interface ApiService {
//       query: Query;
//       mutate: Mutate;
//     }

//     const apiService: ApiService = {
//       query: async ({ query, variables, dataMapper }) => {
//         return client
//           .query({ query, variables })
//           .then((response) => ({
//             ...response,
//             data: response.data && dataMapper ? dataMapper(response.data) : response.data,
//           }))
//           .catch((error) => error);
//       },

//       mutate: async ({ mutation, variables, dataMapper }) => {
//         return client
//           .mutate({ mutation, variables })
//           .then((response) => ({
//             ...response,
//             data: response.data && dataMapper ? dataMapper(response.data) : response.data,
//           }))
//           .catch((error) => error);
//       },
//     };

//     // -- example of usage
//     const mutationRes = await apiService.mutate<CreateUserPayload, CreateUserResponse>({
//       mutation: CREATE_ONE_USER,
//       variables: {
//         email: 'newkinitos22@gmail.com',
//         nik: 'newUserKi22',
//       },
//       dataMapper: ({ data }: CreateUserApiResponse) => ({ email: data.email }),
//     });

//     const queryRes = await apiService.query<undefined, GetUsersResponse>({
//       query: GET_USERS,
//       dataMapper: ({ users }: GetUsersApiResponse) => ({
//         users: users.edges.map((item) => ({ email: item.node.email })),
//       }),
//     });

//     log(mutationRes, 'MUTATION RES');
//     log(queryRes, 'QUERY RES');
//   });
// });

// const log = (...args: any) => console.log(util.inspect(args, false, null, true));

// // GQL
// const GET_USERS = gql`
//   query GetUsers {
//     users: users {
//       edges {
//         node {
//           email
//         }
//       }
//     }
//   }
// `;

// type GetUsersApiResponse = {
//   users: {
//     edges: {
//       node: {
//         email: string;
//       };
//     }[];
//   };
// };

// type GetUsersResponse = {
//   users: { email: string }[];
// };

// const CREATE_ONE_USER = gql`
//   mutation CreateOneUser($email: String!, $nik: String!) {
//     data: createOneUser(input: { user: { email: $email, nik: $nik } }) {
//       email
//       created
//     }
//   }
// `;

// type CreateUserPayload = {
//   email: string;
//   nik: string;
// };

// type CreateUserApiResponse = {
//   data: {
//     email: string;
//     created: string;
//     __typeName: string;
//   };
// };

// type CreateUserResponse = {
//   email: string;
// };
