import { User } from '@hft/db';
import {
  CreateOneUserInputDto,
  UpdateOneUserInputDto,
  UserDto,
} from '@hft/dto/api';
import {
  NestjsQueryGraphQLModule
} from '@nestjs-query/query-graphql';
import { NestjsQueryTypegooseModule } from '@nestjs-query/query-typegoose';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [NestjsQueryTypegooseModule.forFeature([User])],
      resolvers: [
        {
          DTOClass: UserDto,
          EntityClass: User,
          CreateDTOClass: CreateOneUserInputDto,
          UpdateDTOClass: UpdateOneUserInputDto,
          enableAggregate: false,
          aggregate: {
            disabled: true,
          },
          create: {
            many: {
              disabled: true,
            },
          },
          update: {
            many: {
              disabled: true,
            },
          },
          delete: {
            many: {
              disabled: true,
            },
          },
        },
      ],
    }),
  ],
})
export class UserModule {}
