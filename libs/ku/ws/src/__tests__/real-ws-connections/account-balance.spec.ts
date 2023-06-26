import { pause } from '@hft/utils';
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import { AccountBalance_subscription_manager } from "../../lib/account-balance.subscription-manager";
import { ConnectionManager } from "../../lib/connection-manager";
import { KuWsModule } from "../../lib/ku-ws.module";
import { MessageHandler } from "../../lib/message-handler";
import { SubscriptionManager } from "../../lib/subscription-manager";

describe('account-balance', () => {
  it('account-balance ala-crud', (done) => {
    @Module({
      imports: [ConfigModule.forRoot({
        isGlobal: true,
        envFilePath: `${__dirname}/.test.env`,
      }), KuWsModule],
    })
    class App {}

    const test = async () => {
      const app = await NestFactory.create(App, { logger: false });
      const connectionManager = app.get(ConnectionManager);
      
      expect(connectionManager).toBeInstanceOf(ConnectionManager);

      const subscriptionManager = await connectionManager.connect();

      expect(subscriptionManager).toBeInstanceOf(SubscriptionManager);

      const messageHandler = subscriptionManager.getMessageHandler();

      expect(messageHandler).toBeInstanceOf(MessageHandler);

      const stop = messageHandler.addHandler('ACCOUNT_BALANCE', (jData) => {
        console.log(jData);
      });
      const account_balance = await subscriptionManager.ACCOUNT_BALANCE({
        id: Date.now().toString(),
        topic: '/account/balance',
        type: 'subscribe',
      });

      expect(account_balance).toBeInstanceOf(AccountBalance_subscription_manager);

      await pause(4000);

      await connectionManager.disconnect();

      done();
    }

    test();
  }, 20_000);
});
