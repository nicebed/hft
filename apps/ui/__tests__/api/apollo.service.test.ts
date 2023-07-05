import { ApolloClient, InMemoryCache } from '@apollo/client';
import { config } from '@app/shared/lib/config';
describe('api service', () => {
  const client = new ApolloClient({
    uri: config.API_URL,
    cache: new InMemoryCache(),
  });
  it('must connect to graphql', async () => {
    console.log(`Connected to ${(client.link as any).options.uri}`);
    expect(client).toBeDefined();
  });
});
