import { Base } from '@typegoose/typegoose/lib/defaultClasses';
import { Types } from 'mongoose';
import { prop, modelOptions } from '@typegoose/typegoose';

@modelOptions({
  schemaOptions: {
    _id: true,
    id: true,
    timestamps: {
      createdAt: 'created',
      updatedAt: 'updated',
    },
  },
})
export class RootEntity implements Base{
  _id!: Types.ObjectId;

  id!: string;

  @prop({ default: Date.now })
  created!: Date;

  @prop({ default: Date.now })
  updated!: Date;
}
