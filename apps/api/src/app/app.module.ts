import { GQL_REDIS } from '@hft/types/gql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import { Redis } from 'ioredis';

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
  providers: [
    {
      provide: GQL_REDIS,
      useFactory() {
        const options = {
          host: 'localhost',
          port: 6379,
        };

        return new RedisPubSub({
          publisher: new Redis(options),
          subscriber: new Redis(options),
        });
      },
    },
  ],
})
export class AppModule {}
