import { Module } from '@nestjs/common';
import { GetProvider } from './get.provider';
import { KuHttpService } from './ku-http.service';
import { PostProvider } from './post.provider';
import { V2HftProvider } from './v2-hft.provider';

@Module({
  providers: [KuHttpService, PostProvider, GetProvider, V2HftProvider],
  exports: [KuHttpService],
})
export class KuHttpModule {}
