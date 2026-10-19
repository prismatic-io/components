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
export interface OrderPollCursor extends Record<string, unknown> {
  watermark: string;
  boundaryIds: number[];
}
export interface PollingState extends Record<string, unknown> {
  lastPolledAt?: string;
  boundaryIds?: number[];
  cursor?: OrderPollCursor;
  initialSyncFrom?: string;
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
export interface PollingChangesObject {
  created: TimestampedRecord[];
  updated: TimestampedRecord[];
}
export interface PollingRecordChange {
  changeType: "created" | "updated";
  record: TimestampedRecord;
}
export interface PollWindow {
  after: string;
  notBefore?: string;
}
export type OrderRecord = TimestampedRecord & {
  orderId: number;
};
interface OrderPageQuery {
  modifyDateStart: string;
  modifyDateEnd: string;
}
export interface NormalRound {
  delivered: OrderRecord[];
  cursor: OrderPollCursor;
  drained: boolean;
  stuck: boolean;
}
export type FetchOrderPage = (query: OrderPageQuery) => Promise<OrderRecord[]>;
export interface WatermarkWindow {
  since: string;
  createdSince: string;
  isInitialSync: boolean;
}
export interface DrainResult {
  records: OrderRecord[];
  cursor: OrderPollCursor;
  drained: boolean;
}
