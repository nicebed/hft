import { ApolloClient, HttpLink, InMemoryCache, split as apolloSplit, gql } from '@apollo/client';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { getMainDefinition } from '@apollo/client/utilities';
import { createClient } from 'graphql-ws';
import { _bootPseudoBackend } from './_pseudo-backend.main';
import { _TestConfig } from './_test-config.provider';

describe(`Auth flow with some messenger. (gql-subscriptions)`, () => {
  let closeApp: () => Promise<void>;

  beforeAll(async () => {
    closeApp = await _bootPseudoBackend();
  });

  afterAll(async () => {
    closeApp && (await closeApp());
  });

  it('should work | authByMessage0', (done) => {
    const test = async () => {
      expect('should').not.toBe('errors');

      const uri = `http://${_TestConfig.app.host}:${_TestConfig.app.port}/graphql`;
      const apolloHttpLink = new HttpLink({
        uri,
      });
      console.log(uri.replace(/^https?/, 'ws'));
      const apolloWsLink = new GraphQLWsLink(
        createClient({
          url: uri.replace(/^https?/, 'ws'),
        })
      );
      const apolloSplitLink = apolloSplit(
        ({ query }) => {
          const definition = getMainDefinition(query);
          console.log(definition);
          return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
        },
        apolloWsLink,
        apolloHttpLink
      );
      const apolloClient = new ApolloClient({
        link: apolloSplitLink,
        cache: new InMemoryCache(),
        headers: {
          'content-type': 'application/json',
        },
      });
      const subscription = await apolloClient.subscribe({
        query: gql`
          subscription {
            login(loginData: { phone: 911, communicationProvider: "hello" }) {
              phone
            }
          }
        `,
      });

      subscription.subscribe({
        error: console.warn,
        complete: console.log.bind({}, 'complete'),
        next: (value: any) => {
          console.warn('==================== next ====================');
          console.info(value);
          console.warn('==================== next ====================');
        },
        start: (arg: any) => {
          console.warn('==================== start =====================');
          console.info(arg);
          console.warn('==================== start =====================');
        },
      });

      await new Promise((resolve) => setTimeout(resolve, 1_000 * 60 * 5));

      done();
    };

    test();
  }, 1_000_000);
});
