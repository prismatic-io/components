import type { Variables } from "graphql-request";

export interface Webhookinput extends Variables {
  topic: string;
  webhookSubscription: {
    callbackUrl: string;
    format: string;
  };
}
