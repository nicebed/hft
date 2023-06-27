import { INestApplication, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { KuHttpModule } from './ku-http.module';
import { V2HftProvider } from './v2-hft.provider';
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

describe('HFT provider', () => {
  let app: INestApplication;
  let HFT: V2HftProvider;

  beforeAll(async () => {
    app = await NestFactory.create(App, { logger: false });
    HFT = app.get(V2HftProvider);
  });

  it('/api/v2/accounts/inner-transfer', (done) => {
    const test = async () => {
      const res = await HFT.inner_transfer({
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


  it('/api/v1/accounts', (done) => {
    const test = async () => {
      const res = await HFT.hft_accounts({
        currency: 'USDT',
        type: 'trade_hf',
      });

      expect(res?.data).toBeInstanceOf(Array);

      done();
    };

    test();
  });
});
