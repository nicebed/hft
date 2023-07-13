import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
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
          playground: false,
          ...(process.env.NODE_ENV !== 'production' && { plugins: [ApolloServerPluginLandingPageLocalDefault()] }),
        };
      },
    }),
  ],
})
export class AppModule {}
