import type { Variables } from "graphql-request";

export interface WebhookSubscription {
  id: string;
  endpoint: {
    callbackUrl: string;
  };
  topic: string;
  createdAt: string;
  updatedAt: string;
  format: string;
  includeFields: string[];
  metafieldNamespaces: string[];
  apiVersion: {
    displayName: string;
  };
}

export interface Webhookinput extends Variables {
  topic: string;
  webhookSubscription: {
    callbackUrl: string;
    format: string;
  };
}
