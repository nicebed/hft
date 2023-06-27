import { CurrencyPair, KuReq } from '@hft/types/ku';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpProvider } from './ku-http.provider';
import { _Keys } from './types';

@Injectable()
export class GetProvider extends HttpProvider {
  constructor(protected configService: ConfigService<_Keys, true>) {
    super(configService);
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
