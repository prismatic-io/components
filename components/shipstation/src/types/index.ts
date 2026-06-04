import type { Connection } from "@prismatic-io/spectral";

export interface WebhookSubscriptionParams {
  connection: Connection;
  webhookEvent: string;
  storeId?: number;
  friendlyName?: string;
}

export interface Order {
  orderId: number;
  orderNumber: string;
}

export interface Product {
  productId: number;
  name: string;
  sku: string;
}

export interface Warehouse {
  warehouseId: number;
  warehouseName: string;
}

export interface PollingState {
  lastPolledAt?: string;
}


export interface WebhookFlowState {
  webhookId: number;
  previousEvent: string;
  previousStoreId: string | null;
}

export interface Webhook {
  WebHookID: number;
  Url: string;
  Active: boolean;
  id: string;
  target_url: string;
  event: string;
}

export interface Fulfillment {
  fulfillmentId: number;
  orderNumber: string;
}

export interface TimestampedRecord {
  createDate: string;
  modifyDate: string;
}
