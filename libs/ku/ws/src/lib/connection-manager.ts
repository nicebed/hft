import { KuHttpService } from '@hft/ku/http';
import { Channel, KuWs } from '@hft/types/ku';
import { qsFromObj } from '@hft/utils';
import { Injectable } from '@nestjs/common';
import { WebSocket } from 'ws';
import { SubscriptionManager } from './subscription-manager';

@Injectable()
export class ConnectionManager {
  private ws?: WebSocket;
  constructor(private http: KuHttpService) {}

  async connect() {
    const { endpoint, token, pingTimeout, pingInterval } =
      await this.http.POST_apply_private_connect_token();

    if (this.ws) {
      await this.disconnect();
    }

    return new Promise<SubscriptionManager>((resolve, reject) => {
      const ws = new WebSocket(
        `${endpoint}?${qsFromObj({ token, id: Date.now() })}`
      );

      this.ws = ws;
      ws.once('error', reject);
      ws.once('message', (welcome) => {
        const jWelcome = JSON.parse(
          welcome.toString()
        ) as KuWs['WELCOME']['SUB']['PAYLOAD'];

        if (jWelcome.type !== 'welcome') {
          // TODO write tests and rm this check
          throw new Error();
        }
        const subscriptionManager = new SubscriptionManager(ws);
        const messageHandler = subscriptionManager.getMessageHandler();

        ws.on('message', (message) => {
          const jMessage = JSON.parse(
            message.toString()
          ) as KuWs[Channel]['SUB']['PAYLOAD'];

          console.log(jMessage);

          // ts is not genius... so
          if (jMessage.subject === 'trade.l2update') {
            // tak nado
            messageHandler['trade.l2update'](jMessage);
          } else if (jMessage.subject === 'account.balance') {
            // i tak nado(
            messageHandler['account.balance'](jMessage);
          }
        });

        resolve(subscriptionManager);
      });
    });
  }

  async disconnect() {
    if (this.ws) {
      // TODO add more strict check for different "readyState" values
      return new Promise((resolve, reject) => {
        this.ws!.once('error', reject);
        this.ws!.on('close', resolve);

        this.ws!.close();
      });
    }
  }
}
