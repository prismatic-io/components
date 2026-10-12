import type { Connection } from "@prismatic-io/spectral";
export interface CreateWebhookParams {
  subscriptionUrl: string;
  eventAction: string;
  eventObject: string;
  userId?: number;
  httpAuthUser?: string;
  httpAuthPassword?: string;
  version: string;
}
export interface WebhookParams {
  connection: Connection;
  version: string;
  eventAction: string;
  eventObject: string;
  userId?: number;
  httpAuthUser?: string;
  httpAuthPassword?: string;
}
export interface Webhook {
  subscription_url: string;
  id: string;
}
