import { Field, InputType } from '@nestjs/graphql';
import { UserDto } from './user.dto';


@InputType()
export class CreateOneUserInputDto implements Pick<UserDto, 'email' | 'nik'> {
  @Field()
  email!: string;

  @Field()
  nik!: string;
}
