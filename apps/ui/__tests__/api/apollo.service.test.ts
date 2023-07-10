import { ApolloClient, InMemoryCache } from '@apollo/client';
import { config } from '@app/shared/lib/config';
describe('api service', () => {
  const client = new ApolloClient({
    uri: config.API_URL,
    cache: new InMemoryCache(),
  });

  // function mySubscribe<T>(obs$: Observable<T>, objWithNextEtc: any, unsubsribeSomeHow: any) {
  //   const originSubscription = obs$.subscribe(objWithNextEtc);
  //   return {
  //     ...originSubscription,
  //     unsubscribe: () => {
  //       // TODO unsubscribe from api
  //       originSubscription.unsubscribe();
  //     },
  //   } satisfies typeof originSubscription;
  // }

  // const users$ = client.subscribe({});

  // users$.subscribe({})  ;
  // const subscription = mySubscribe(users$, { next: ()}, {})

  // subscription.unsubscribe()

  it('must connect to graphql', async () => {
    console.log(`Connected to ${(client.link as any).options.uri}`);
    expect(client).toBeDefined();
  });
});
