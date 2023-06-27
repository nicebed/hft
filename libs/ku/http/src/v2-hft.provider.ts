import { KuReq, KuRes } from '@hft/types/ku';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpProvider } from './ku-http.provider';
import { _Keys } from './types';

@Injectable()
export class V2HftProvider extends HttpProvider {
  constructor(protected configService: ConfigService<_Keys, true>) {
    super(configService);
  }

  /**
   * @description
   * [link](https://docs.kucoin.com/spot-hf/?python#list-high-frequency-trading-accounts)
   */
  public async hft_accounts(data: KuReq<'/api/v1/accounts'>['query']) {
    const { url, forSignature, method, query }: KuReq<'/api/v1/accounts'> = {
      url: 'https://api.kucoin.com/api/v1/accounts',
      method: 'GET',
      query: data,
      forSignature: {
        endpoint: '/api/v1/accounts',
        method: 'GET',
        query: data,
      },
    };
    const headers = this.signGenerator.generateHeaders(forSignature, this.keys);

    return this.http(url, { method, query, headers }).then(
      ({ body }) => body.json() as Promise<KuRes<'/api/v1/accounts'>>
    );
  }

  /**
   * @description
   * [link](https://docs.kucoin.com/spot-hf/#internal-funds-transfers-in-high-frequency-trading-accounts)
   */
  public async inner_transfer(
    data: KuReq<'/api/v2/accounts/inner-transfer'>['body']
  ) {
    const {
      body,
      forSignature,
      method,
      url,
    }: KuReq<'/api/v2/accounts/inner-transfer'> = {
      url: 'https://api.kucoin.com/api/v2/accounts/inner-transfer',
      method: 'POST',
      body: data,
      forSignature: {
        method: 'POST',
        endpoint: '/api/v2/accounts/inner-transfer',
        body: data,
      },
    };
    const headers = this.signGenerator.generateHeaders(forSignature, this.keys);

    return this.http(url, { body: JSON.stringify(body), method, headers }).then(
      ({ body }) =>
        body.json() as Promise<KuRes<'/api/v2/accounts/inner-transfer'>>
    );
  }
}
