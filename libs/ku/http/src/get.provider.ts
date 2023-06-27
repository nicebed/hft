import { CurrencyPair, KuReq, KuRes } from '@hft/types/ku';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpProvider } from './ku-http.provider';
import { _Keys } from './types';

@Injectable()
export class GetProvider extends HttpProvider {
  constructor(protected configService: ConfigService<_Keys, true>) {
    super(configService);
  }

  public async aggregated_balance_of_all_sub_accounts() {
    const { forSignature, method, query, url }: KuReq<'/api/v1/sub-accounts'> =
      {
        url: 'https://api.kucoin.com/api/v1/sub-accounts',
        forSignature: {
          endpoint: '/api/v1/sub-accounts',
          method: 'GET',
        },
        method: 'GET',
      };
    const headers = this.signGenerator.generateHeaders(forSignature, this.keys);

    return this.http(url, { method, query, headers }).then(
      ({ body }) => body.json() as Promise<KuRes<'/api/v1/sub-accounts'>>
    );
  }

  public async account_ledgers() {
    const {
      forSignature,
      method,
      query,
      url,
    }: KuReq<'/api/v1/accounts/ledgers'> = {
      url: 'https://api.kucoin.com/api/v1/accounts/ledgers',
      forSignature: {
        endpoint: '/api/v1/accounts/ledgers',
        method: 'GET',
        query: {},
      },
      method: 'GET',
      query: {},
    };
    const headers = this.signGenerator.generateHeaders(forSignature, this.keys);

    return this.http(url, { method, query, headers }).then(
      ({ body }) => body.json() as Promise<KuRes<'/api/v1/accounts/ledgers'>>
    );
  }

  public async full_order_book(symbol: CurrencyPair) {
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
