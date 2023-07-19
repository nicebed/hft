import { ApolloClient, HttpLink, InMemoryCache, gql, split } from '@apollo/client';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { getMainDefinition } from '@apollo/client/utilities';
import { INestApplication } from '@nestjs/common';
import { createClient } from 'graphql-ws';
import supertest from 'supertest';
import { inspect } from 'util';
import ws from 'ws';
import { _bootPseudoBackend } from './_pseudo-backend.main';
import { _TestConfig } from './_test-config.provider';

// TODO update fix and mv to lib
function log(...args: any[]) {
  if (Array.isArray(args)) {
    const label = args.shift();

    console.info(`======================== ${label} ================`);
    console.log(...args.map((a) => inspect(a, { colors: true, depth: 8 })));
    console.info(`======================== ${label} ================`);
  } else {
    console.info('==================================================');
    console.log(inspect(args, { colors: true, depth: 8 }));
    console.info('==================================================');
  }
}

describe(`Auth flow with some messenger. (gql-subscriptions)`, () => {
  let app: INestApplication;

  beforeAll(async () => {
    app = await _bootPseudoBackend();
  });

  afterAll(async () => {
    app && (await app.close());
  });

  it('should work | authByMessage0', (done) => {
    const test = async () => {
      expect('should').not.toBe('errors');

      const httpUrl = `http://${_TestConfig.app.host}:${_TestConfig.app.port}/graphql`;
      const wsUrl = httpUrl.replace(/^https?/, 'ws');
      const apolloClient = new ApolloClient({
        link: split(
          ({ query }) => {
            const definition = getMainDefinition(query);

            return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
          },
          new GraphQLWsLink(
            createClient({
              webSocketImpl: ws,
              url: wsUrl,
            })
          ),
          new HttpLink({
            uri: httpUrl,
          })
        ),
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
        error: (..._) => console.info('error', ..._),
        complete: (..._) => log('complete', ..._),
        next: (..._) => {
          log('next', ..._);
          done();
        },
        start: (..._) => log('start', ..._),
      });

      await new Promise((resolve) => setTimeout(resolve, 1_000));
      await supertest(app.getHttpServer()).get('/authByMessage0').expect(200);
    };

    test();
  });
});
