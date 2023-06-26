import { KuWs, Payload } from '@hft/types/ku';
import { InternalServerErrorException } from '@nestjs/common';
import { WebSocket } from 'ws';
import { ISubscriptionManager } from './subscription-manager.interface';

type SubscriptionState = {
  id: string | null;
  changeState?: Parameters<ConstructorParameters<typeof Promise>[0]>;
};

export class AccountBalance_subscription_manager
  implements ISubscriptionManager
{
  constructor(private ws: WebSocket) {}

  private state: SubscriptionState = {
    id: null,
  };

  send(payload: Payload<'ACCOUNT_BALANCE'>) {
    if (this.state.id && payload.type === 'subscribe') return false;
    else if (!this.state.id && payload.type === 'unsubscribe') return false;

    this.ws.send(JSON.stringify(payload));

    return new Promise<true>((resolve, reject) => {
      this.state.id = payload.id;
      this.state.changeState = [resolve, reject];

      console.log('this.state', this.state);
    });
  }

  /**
   *
   * @deprecated
   *
   * This method is not deprecated, BUT!
   *
   * You should not call it.
   *
   * Why it is not private? Yes it should.
   * This is choice to the typescript compatibility only for developer purposes.
   */
  ack({ id }: KuWs['ACK']['SUB']['PAYLOAD']): boolean {
    console.log(id);

    const success = this.state.id === id;
    const fullFilled = this.state.changeState[success ? 0 : 1];

    // TODO write tests and rm this check
    if (typeof fullFilled !== 'function') {
      throw new InternalServerErrorException('Impossible...');
    }

    fullFilled(success);

    return success;
  }
}
