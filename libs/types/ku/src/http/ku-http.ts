import { CurrencyPair, CurrencyType } from '../core';
import { KuHeaders } from './ku-headers';

type URL = 'https://api.kucoin.com';

export type KuHttp = {
  '/api/v1/accounts/ledgers': {
    url: `${URL}/api/v1/accounts/ledgers`;
    req: {
      method: 'GET';
      query: {
        /**
         * @description
         *
         * honestly it is possible to send "CurrencyType,CurrencyType..."
         * but for simplicity declare only single
         */
        currency?: CurrencyType;
        direction?: 'in' | 'out';
        bizType?:
          | 'DEPOSIT'
          | 'WITHDRAW'
          | 'TRANSFER'
          | 'SUB_TRANSFER'
          | 'TRADE_EXCHANGE'
          | 'MARGIN_EXCHANGE'
          | 'KUCOIN_BONUS';
        startAt?: number;
        endAt?: number;
      };
      body?: never;
      headers: KuHeaders;
    };
    res: {
      code: '200000';
      data: {
        id: string;
        currency: CurrencyType;
        amount: string;
        fee: string; //	Fees generated in transaction, withdrawal, etc.
        balance: string; //	Remaining funds after the transaction.
        accountType: 'MAIN' | 'TRADE' | 'MARGIN' | 'CONTRACT';
        bizType: string; //	Business type leading to the changes in funds, such as exchange, withdrawal, deposit, KUCOIN_BONUS, REFERRAL_BONUS, Lendings etc.
        direction: 'out';
        in;
        createdAt: number; // Time of the event
        context: string; // TODO => JSON-string ???
      };
    };
  };

  '/api/v1/bullet-public': {
    url: `${URL}/api/v1/bullet-public`;
    req: {
      method: 'POST';
      query?: never;
      body?: never;
      headers?: never;
    };
    res: {
      code: '200000';
      data: {
        token: string;
        instanceServers: {
          endpoint: 'wss://ws-api-spot.kucoin.com/';
          encrypt: true;
          protocol: 'websocket';
          pingInterval: number;
          pingTimeout: number;
        }[];
      };
    };
  };
  '/api/v1/bullet-private': {
    url: `${URL}/api/v1/bullet-private`;
    req: {
      method: 'POST';
      query?: never;
      body?: never;
      headers: KuHeaders;
    };
    res: {
      code: '200000';
      data: {
        token: string;
        instanceServers: {
          endpoint: 'wss://ws-api-spot.kucoin.com/';
          encrypt: true;
          protocol: 'websocket';
          pingInterval: number;
          pingTimeout: number;
        }[];
      };
    };
  };
  '/api/v3/market/orderbook/level2': {
    url: `${URL}/api/v3/market/orderbook/level2`;
    req: {
      method: 'GET';
      query: { symbol: CurrencyPair };
      body?: never;
      headers: KuHeaders;
    };
    res: {
      type: 'message';
      topic: string;
      subject: 'trade.l2update';
      data: {
        changes: {
          asks: [string, string, string];
          bids: [string, string, string];
        };
        sequenceEnd: number;
        sequenceStart: number;
        symbol: CurrencyPair;
        time: number;
      };
    };
  };
};

export type Endpoint = keyof KuHttp;

export type KuReq<T extends Endpoint = Endpoint> =
  KuHttp[T]['req']['headers'] extends never | void
    ? Omit<KuHttp[T]['req'], 'headers'> & { url: KuHttp[T]['url'] }
    : Omit<KuHttp[T]['req'], 'headers'> & { url: KuHttp[T]['url'] } & {
        forSignature: {
          endpoint: T;
        } & Omit<
          KuHttp[T]['req'],
          | Exclude<keyof KuHttp[T]['req'], keyof Partial<KuHttp[T]['req']>>
          | 'headers'
        >;
      };

export type KuRes<T extends Endpoint = Endpoint> = KuHttp[T]['res'];
