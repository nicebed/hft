import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { User } from './entities';

@Module({
  imports: [TypegooseModule.forRoot('mongodb://localhost:27017/draft-hft-00')],
  exports: [TypegooseModule.forFeature([User])],
})
export class DbModule {}
