import { GraphQLDefinitionsFactory } from '@nestjs/graphql';
import { join } from 'path';

new GraphQLDefinitionsFactory().generate({
  typePaths: [join(__dirname, './gql/*.graphql')],
  path: join(__dirname, '_all.gql.ts'),
  outputAs: 'interface',
});
