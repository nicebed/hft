import { Field, ObjectType, ID, GraphQLISODateTime } from '@nestjs/graphql';
import { FilterableField, IDField } from '@nestjs-query/query-graphql';
import { User } from '@hft/db';
import { Types } from 'mongoose';


@ObjectType('User')
export class UserDto implements User {
  @Field()
  email!: string;

  @Field()
  nik!: string;

  @IDField(() => ID)
  _id!: Types.ObjectId;

  @FilterableField(() => GraphQLISODateTime)
  created!: Date;

  @FilterableField(() => GraphQLISODateTime)
  updated!: Date;
}
