import { User } from '@hft/db';
import { FilterableField, IDField } from '@nestjs-query/query-graphql';
import { GraphQLISODateTime, ID, ObjectType } from '@nestjs/graphql';
import { Types } from 'mongoose';

const standardComparisonFilters = (['like', 'eq', 'or'] as const).map((f) => f);
const standardTimeComparisonFilters = (['between', 'gte', 'lte'] as const).map(
  (f) => f
);
@ObjectType(User.name)
export class UserDto implements User {
  @FilterableField({ allowedComparisons: standardComparisonFilters })
  email!: string;

  @FilterableField({ allowedComparisons: standardComparisonFilters })
  nik!: string;

  @IDField(() => ID)
  _id!: Types.ObjectId;

  @FilterableField(() => GraphQLISODateTime, {
    allowedComparisons: standardTimeComparisonFilters,
  })
  created!: Date;

  @FilterableField(() => GraphQLISODateTime, {
    allowedComparisons: standardComparisonFilters,
  })
  updated!: Date;
}
