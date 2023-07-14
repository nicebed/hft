import { RootQueryResolver } from '@hft/resolvers';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';

@Module({
  imports: [
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      useFactory() {
        return {
          subscriptions: {
            'graphql-ws': true,
          },
          typePaths: ['./**/*.gql'],
          playground: true,
        };
      },
    }),
  ],
  providers: [RootQueryResolver],
})
export class AppModule {}
