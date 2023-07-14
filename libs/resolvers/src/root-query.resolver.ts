import { Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class RootQueryResolver {
  @Query()
  random() {
    return Math.random();
  }
}
