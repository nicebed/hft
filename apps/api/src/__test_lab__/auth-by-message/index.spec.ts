import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
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

      const apolloClient = new ApolloClient({
        uri: `http://${_TestConfig.app.host}:${_TestConfig.app.port}/graphql`,
        cache: new InMemoryCache(),
        headers: {
          'content-type': 'application/json',
        },
      });

      const res = await apolloClient
        .query({
          query: gql`
            query IsItTestNow {
              get_null_if_test
            }
          `,
        })
        .catch(console.warn);
      console.log(res);
      await new Promise((resolve, reject) => setTimeout(resolve, 900_000));

      done();
    };

    test();
  }, 1_000_000);
});
