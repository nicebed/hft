import { User } from '@hft/db';
import { UserDto } from '@hft/dto/api';
import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql';
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
        },
      ],
    }),
  ],
})
export class UserModule {}
