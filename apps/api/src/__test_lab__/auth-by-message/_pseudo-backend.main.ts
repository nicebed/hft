import { Module, Query } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { GraphQLModule, Resolver } from "@nestjs/graphql";
import { _TestConfig } from "./_test-config.provider";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { join } from "path";


export async function _bootPseudoBackend() {
  const app = await NestFactory.create(_PseudoBackend, { logger: false });

  await app.listen(_TestConfig.app.port);

  return app.close;
}


@Resolver()
class _PseudoResolver {
  
}


@Module({
  providers: [_PseudoResolver],
  imports: [GraphQLModule.forRoot<ApolloDriverConfig>({
    driver: ApolloDriver,
    subscriptions: {
      'graphql-ws': true,
    },
    typePaths: [join(__dirname, './gql/*.graphql')],
    playground: false,
  })]
})
class _PseudoBackend {}
