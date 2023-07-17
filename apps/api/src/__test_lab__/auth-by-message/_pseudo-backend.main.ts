import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Args, GraphQLModule, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { join } from 'path';
import { _TestConfig } from './_test-config.provider';
import { _UserKeys } from './_user-keys-body.type';

export async function _bootPseudoBackend() {
  try {
    const app = await NestFactory.create(_PseudoBackend);

    await app.listen(_TestConfig.app.port);

    return app.close;
  } catch (err) {
    console.warn(err);
  }
}

@Resolver()
class _PseudoResolver {
  pubSub = new PubSub();

  @Subscription('login')
  async login(@Args() args: _UserKeys) {
    const iterator = this.pubSub.asyncIterator('login');

    console.log(args);

    try {
      return iterator;
    } finally {
      await this.pubSub.publish('login', args);
    }
  }
}

@Module({
  providers: [_PseudoResolver],
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      subscriptions: {
        'graphql-ws': true,
      },
      typePaths: [join(__dirname, './gql/*.graphql')],
      playground: false,
    }),
  ],
})
class _PseudoBackend {}
