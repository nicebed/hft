import { KuRes } from '@hft/types/ku';
import { INestApplication, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { GetProvider } from './get.provider';
import { KuHttpModule } from './ku-http.module';
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

  beforeAll(async () => {
    app = await NestFactory.create(App, { logger: false });
    GET = app.get(GetProvider);
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

      console.log(res);

      // TODO more concreted check
      expect(res).toBeDefined();

      done();
    };

    test();
  });
});
