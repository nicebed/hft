import { KuRes } from '@hft/types/ku';
import { INestApplication, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { GetProvider } from './get.provider';
import { KuHttpModule } from './ku-http.module';
import { PostProvider } from './post.provider';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `${__dirname}/.test.env`,
    }),
    KuHttpModule,
  ],
})
class App {}

describe('GET provider', () => {
  let app: INestApplication;
  let GET: GetProvider;
  let POST: PostProvider;

  beforeAll(async () => {
    app = await NestFactory.create(App, { logger: false });
    GET = app.get(GetProvider);
    POST = app.get(PostProvider);
  });

  it('account/ledgers', (done) => {
    const test = async () => {
      const res = await GET.account_ledgers();

      expect(res?.code).toBe(
        '200000' satisfies KuRes<'/api/v1/accounts/ledgers'>['code']
      );

      done();
    };

    test();
  });

  it('sub-accounts', (done) => {
    const test = async () => {
      const res = await GET.aggregated_balance_of_all_sub_accounts();

      // TODO more concreted check
      expect(res).toBeDefined();

      done();
    };

    test();
  });

  it('/api/v2/accounts/inner-transfer', (done) => {
    const test = async () => {
      const res = await POST.HFT.inner_transfer({
        currency: 'USDT',
        amount: '1',
        clientOid: 'hello-world-ok-google',
        from: 'trade',
        to: 'trade_hf',
      });

      expect(res?.data?.orderId).toBeDefined();

      done();
    };

    test();
  });
});
