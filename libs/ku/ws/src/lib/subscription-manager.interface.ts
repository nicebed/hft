import {KuWs} from "@hft/types/ku";

export interface ISubscriptionManager {
  ack(jData: KuWs['ACK']['SUB']['PAYLOAD']): boolean,
}
