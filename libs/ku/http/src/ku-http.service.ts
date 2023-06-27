import { Injectable } from '@nestjs/common';
import { GetProvider } from './get.provider';
import { PostProvider } from './post.provider';

@Injectable()
export class KuHttpService {
  constructor(public POST: PostProvider, public GET: GetProvider) {}
}
