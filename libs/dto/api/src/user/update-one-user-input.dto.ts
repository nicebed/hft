import { Field, InputType } from '@nestjs/graphql';
import { CreateOneUserInputDto } from './create-one-user-input.dto';


@InputType()
export class UpdateOneUserInputDto implements Partial<CreateOneUserInputDto> {
  @Field({ nullable: true })
  email?: string;

  @Field({ nullable: true })
  nik?: string;
}
