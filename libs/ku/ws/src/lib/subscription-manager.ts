import { Channel, KuWs, Payload } from '@hft/types/ku';
import { WebSocket } from 'ws';
import { AccountBalance_subscription_manager } from './account-balance.subscription-manager';
import { Level2_subscription_manager } from './level2.subscription-manager';
import { MessageHandler } from './message-handler';
import { ISubscriptionManager } from './subscription-manager.interface';

// TODO add typings and move somewhere in project
function genNoSubjectCaser(managers: ISubscriptionManager[]) {
  const caser = {
    pong(jData) {
      // TODO,
    },
    ack(jData: KuWs['ACK']['SUB']['PAYLOAD']) {
      void managers.some((m) => m.ack(jData));
    },
  };

  return (jData) => {
    caser[jData.type](jData);
  };
}

export class SubscriptionManager
  implements Record<keyof Pick<KuWs, Channel | 'PING_PONG'>, any>
{
  private readonly messageHandler: MessageHandler;

  public getMessageHandler() {
    return this.messageHandler;
  }
  private readonly level2: Level2_subscription_manager;
  private readonly account_balance: AccountBalance_subscription_manager;

  constructor(private ws: WebSocket) {
    this.level2 = new Level2_subscription_manager(this.ws);
    this.account_balance = new AccountBalance_subscription_manager(this.ws);

    const managersByChanel = [this.account_balance, this.level2];

    this.messageHandler = new MessageHandler(
      genNoSubjectCaser(managersByChanel)
    );
  }

  async ACCOUNT_BALANCE(
    firstPayload: Omit<
      Payload<'ACCOUNT_BALANCE'>,
      keyof Pick<Payload<'ACCOUNT_BALANCE'>, 'type'>
    > & { type: 'subscribe' }
  ) {
    await this.account_balance.send(firstPayload);

    return this.account_balance;
  }

  async LEVEL_2(
    firstPayload: Omit<
      Payload<'LEVEL_2'>,
      keyof Pick<Payload<'LEVEL_2'>, 'type'>
    > & { type: 'subscribe' }
  ) {
    const isSended = await this.level2.send(firstPayload);

    if (!isSended) {
      // TODO write tests and rm this check
      throw new Error();
    }

    return this.level2;
  }
  PING_PONG() {
    // TODO
  }
}
