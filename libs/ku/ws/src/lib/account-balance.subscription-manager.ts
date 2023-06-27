import { KuWs, Payload } from '@hft/types/ku';
import { WebSocket } from 'ws';
import { ISubscriptionManager } from './subscription-manager.interface';

/**
 * status has past meaning, so
 * - "subscribe" is means subscribED
 * - "unsubscribe" - already UNsubscribED
 * - "*ING" - before above statuses
 */
type SubscriptionState = {
  id: string | null;
  status:
    | Payload<'ACCOUNT_BALANCE'>['type']
    | `${Payload<'ACCOUNT_BALANCE'>['type']}ING`;
  /**
   * @description
   * 
   * [resolve, reject] | null 
   */
  changeStatus: [() => void, () => void] | null;
};

export class AccountBalance_subscription_manager
  implements ISubscriptionManager
{
  constructor(private ws: WebSocket) {}

  private state: SubscriptionState = {
    id: null,
    status: 'unsubscribe',
    changeStatus: null,
  };

  send(payload: Payload<'ACCOUNT_BALANCE'>) {
    if (
      (
        [
          'subscribeING',
          'unsubscribeING',
          payload.type,
        ] satisfies (typeof this.state.status)[]
      ).includes(this.state.status)
    ) {
      return;
    }

    this.ws.send(JSON.stringify(payload));

    return new Promise<void>((resolve, reject) => {
      this.state.id = payload.id;
      this.state.status = `${payload.type}ING`;
      this.state.changeStatus = [resolve, reject];
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
    const isOurAck = this.state.id === id;

    if (!isOurAck) return false;

    const resolve = this.state.changeStatus[0];

    resolve();

    return true;;
  }
}
