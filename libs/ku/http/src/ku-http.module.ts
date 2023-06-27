import { Module } from '@nestjs/common';
import { KuHttpService } from './ku-http.service';
import { PostProvider } from './post.provider';
import { GetProvider } from './get.provider';

@Module({
  providers: [KuHttpService, PostProvider, GetProvider],
  exports: [KuHttpService],
})
export class KuHttpModule {}
