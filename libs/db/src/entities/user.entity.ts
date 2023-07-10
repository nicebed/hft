import { modelOptions, prop } from '@typegoose/typegoose';
import { RootEntity } from '../root-entity';

@modelOptions({
  schemaOptions: {
    collection: 'users',
  },
})
export class User extends RootEntity {
  @prop({ required: true, unique: true })
  email!: string;

  @prop({ required: true, unique: true })
  nik!: string;
}
