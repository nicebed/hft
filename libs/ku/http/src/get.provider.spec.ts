import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { KuRes } from '@hft/types/ku';
import { GetProvider } from './get.provider';
import { KuHttpModule } from './ku-http.module';

describe('GET provider', () => {
  it('account/ledgers', (done) => {
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

    const test = async () => {
      const app = await NestFactory.create(App, { logger: false });
      const GET = app.get(GetProvider);
      const res = await GET.account_ledgers();

      expect(res?.code).toBe(
        '200000' satisfies KuRes<'/api/v1/accounts/ledgers'>['code']
      );

      done();
    };

    test();
  });
});
