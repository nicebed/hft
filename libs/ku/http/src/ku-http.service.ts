import { CurrencyPair, KuEnvKeys, KuHttp, KuReq, KuRes } from '@hft/types/ku';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { request } from 'undici';
import { SignGenerator } from './sign-generator';

type _Keys = Record<KuEnvKeys, string>;

@Injectable()
export class KuHttpService {
  private signGenerator = new SignGenerator();
  private keys: _Keys;
  private http = request;

  constructor(private configService: ConfigService<_Keys, true>) {
    this.keys = {
      API_KEY: this.configService.get('API_KEY'),
      API_SECRET: this.configService.get('API_SECRET'),
      API_PASSPHRASE: this.configService.get('API_PASSPHRASE'),
    };
  }

  public async POST_apply_public_connect_token() {
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

  public async POST_apply_private_connect_token() {
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
        ({ body }) =>
          body.json() as Promise<KuHttp['/api/v1/bullet-private']['res']>
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

  public async GET_full_order_book(symbol: CurrencyPair) {
    const {
      url,
      forSignature,
      method,
      query,
    }: KuReq<'/api/v3/market/orderbook/level2'> = {
      url: 'https://api.kucoin.com/api/v3/market/orderbook/level2',
      forSignature: {
        endpoint: '/api/v3/market/orderbook/level2',
        method: 'GET',
        query: { symbol },
      },
      method: 'GET',
      query: { symbol },
    };
    const headers = this.signGenerator.generateHeaders(forSignature, this.keys);

    return this.http(url, { method, query, headers });
  }
}
