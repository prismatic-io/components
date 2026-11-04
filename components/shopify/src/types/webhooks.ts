import type { Variables } from "graphql-request";
import type { PageInfo } from "./pagination";

export type WebhookSubscriptionFormat = "JSON" | "XML";

export interface WebhookSubscription {
  id: string;
  endpoint: {
    callbackUrl: string;
  };
  topic: string;
  createdAt: string;
  updatedAt: string;
  format: WebhookSubscriptionFormat;
  includeFields: string[];
  metafieldNamespaces: string[];
  apiVersion: {
    displayName: string;
  };
}

export interface CreateWebhookParams extends Variables {
  topic: string;
  webhookSubscription: {
    callbackUrl: string;
    format: WebhookSubscriptionFormat;
  };
}

export interface ShopifyWebhook {
  id: number;
  address: string;
  topic: string;
  created_at: string;
  updated_at: string;
  format: "json" | "xml";
  fields: string[];
  metafield_namespaces: string[];
  api_version: string;
  private_metafield_namespaces: string[];
}

export interface CreateWebhookResponse {
  webhookSubscriptionCreate: {
    webhookSubscription: WebhookSubscription;
    userErrors: Record<string, unknown>[];
  };
}

export interface DeleteWebhookResponse {
  webhookSubscriptionDelete: Record<string, unknown>;
}

export interface ListWebhooksResponse {
  webhookSubscriptions: WebhookSubscription[];
  pageInfo: PageInfo;
}
