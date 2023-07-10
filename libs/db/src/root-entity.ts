import { modelOptions, prop } from '@typegoose/typegoose';
import { Base } from '@typegoose/typegoose/lib/defaultClasses';
import { Types } from 'mongoose';

@modelOptions({
  schemaOptions: {
    _id: true,
    id: false,
    timestamps: {
      createdAt: 'created',
      updatedAt: 'updated',
    },
  },
})
export class RootEntity implements Omit<Base, keyof Pick<Base, 'id'>> {
  _id!: Types.ObjectId;

  @prop({ default: Date.now })
  created!: Date;

  @prop({ default: Date.now })
  updated!: Date;
}
