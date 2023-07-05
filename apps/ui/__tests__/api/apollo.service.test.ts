import { ApolloClient, InMemoryCache } from '@apollo/client';
import { config } from '@app/shared/lib/config';
describe('api service', () => {
  it('must connect to graphql', async () => {
    const client = new ApolloClient({
      uri: config.API_URL,
      cache: new InMemoryCache(),
    });
    console.log(`Connected to ${(client.link as any).options.uri}`);

    expect(client).toBeDefined();
  });
});
