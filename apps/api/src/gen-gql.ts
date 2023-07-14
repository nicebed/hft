import { GraphQLDefinitionsFactory } from '@nestjs/graphql';
import { join } from 'path';

const cwd = process.cwd();

new GraphQLDefinitionsFactory().generate({
  typePaths: [join(cwd, '**/*.gql')],
  path: join(cwd, 'libs/types/gql/src/all.gql.ts'),
  outputAs: 'interface',
});
