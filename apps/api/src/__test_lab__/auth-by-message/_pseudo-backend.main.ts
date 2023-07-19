import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Controller, Get, Module } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Args, GraphQLModule, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { join } from 'path';
import { LoginRes } from './_all.gql';
import { _TestConfig } from './_test-config.provider';
import { _UserKeys } from './_user-keys-body.type';

export async function _bootPseudoBackend() {
  try {
    const app = await NestFactory.create(_PseudoBackend);

    await app.listen(_TestConfig.app.port);

    return app;
  } catch (err) {
    console.warn(err);
  }
}

const defaultPubSub = new PubSub();
@Controller()
class _PseudoController {
  pubSub = defaultPubSub;

  @Get('authByMessage0')
  sendData() {
    this.pubSub.publish('login', {
      login: { communicationProvider: 'ok', phone: 123, simSim: 'asdfasdf' } satisfies LoginRes & any,
    });
  }
}

@Resolver()
class _PseudoResolver {
  pubSub = defaultPubSub;

  @Subscription('login')
  async login(@Args() args: _UserKeys) {
    const iterator = this.pubSub.asyncIterator('login');

    return iterator;
  }
}

@Module({
  providers: [_PseudoResolver],
  controllers: [_PseudoController],
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
