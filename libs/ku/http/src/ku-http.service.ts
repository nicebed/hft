import { Injectable } from '@nestjs/common';
import { GetProvider } from './get.provider';
import { PostProvider } from './post.provider';
import { V2HftProvider } from './v2-hft.provider';

@Injectable()
export class KuHttpService {
  constructor(
    public POST: PostProvider,
    public GET: GetProvider,
    public hftProvider: V2HftProvider
  ) {}
}
