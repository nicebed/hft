import { KuReq, KuRes } from '@hft/types/ku';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpProvider } from './ku-http.provider';
import { _Keys } from './types';

@Injectable()
export class PostProvider extends HttpProvider {
  constructor(protected configService: ConfigService<_Keys, true>) {
    super(configService);
  }

  public async apply_public_connect_token() {
    const { url, method }: KuReq<'/api/v1/bullet-public'> = {
      url: 'https://api.kucoin.com/api/v1/bullet-public',
      method: 'POST',
    };

    return this.http(url, { method })
      .then(
        ({ body }) => body.json() as Promise<KuRes<'/api/v1/bullet-public'>>
      )
      .then(
        ({
          data: {
            instanceServers: [{ endpoint, pingInterval, pingTimeout }],
            token,
          },
        }) => ({
          endpoint,
          token,
          pingInterval,
          pingTimeout,
        })
      );
  }

  public async apply_private_connect_token() {
    const { forSignature, method, url }: KuReq<'/api/v1/bullet-private'> = {
      url: 'https://api.kucoin.com/api/v1/bullet-private',
      forSignature: {
        endpoint: '/api/v1/bullet-private',
        method: 'POST',
      },
      method: 'POST',
    };
    const headers = this.signGenerator.generateHeaders(forSignature, this.keys);

    return this.http(url, { method, headers })
      .then(
        ({ body }) => body.json() as Promise<KuRes<'/api/v1/bullet-private'>>
      )
      .then(
        ({
          data: {
            instanceServers: [{ endpoint, pingInterval, pingTimeout }],
            token,
          },
        }) => ({
          endpoint,
          token,
          pingInterval,
          pingTimeout,
        })
      );
  }
}
