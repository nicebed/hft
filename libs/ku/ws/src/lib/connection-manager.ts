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
      await this.http.POST.apply_private_connect_token();

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

          /**
           * @description
           *
           * _Unfortunately typescript is misunderstand current moment that's why "any"..._
           *
           * ### So what is going on?
           *
           * All "business" messages contains "subject" property and by its value
           * the corresponding handler will receive this message.
           * But "technical" messages has not one (ack, ping, pong, welcome (but it should not appear here))...
           * that's why
           *
           * ```ts
           *   message.subject // undefined
           * ```
           *
           * And the tricky is that we already has messageHandler['undefined'] // NoSubjectHandler
           *
           * So we (but not typescript) sure that each subject (event no-subject) will
           * sended to its handler.
           */
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          messageHandler[jMessage.subject](jMessage as any);
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
