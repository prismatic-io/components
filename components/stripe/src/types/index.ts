import type Stripe from "stripe";







export type ClassResource =
  | Stripe.WebhookEndpointsResource
  | Stripe.PricesResource
  | Stripe.Checkout.SessionsResource;

export type StripeResource = Stripe.WebhookEndpoint | Stripe.Price | Stripe.Checkout.Session;

export type PaginatedRecord = Stripe.ApiListPromise<StripeResource>;

export interface CreatedWebhook {
  webhook: {
    id: string;
    object: string;
    api_version: string;
    application: string;
    created: number;
    description: string;
    enabled_events: string[];
    livemode: boolean;
    metadata: Record<string, unknown>;
    secret: string;
    status: string;
    url: string;
  };
}

export interface ExtendedResponse {
  object: "list";
  url: string;
  lastResponse: {
    headers: {
      [key: string]: string;
    };
    requestId: string;
    statusCode: number;
    apiVersion?: string;
    idempotencyKey?: string;
    stripeAccount?: string;
  };
}

export interface PollingState extends Record<string, unknown> {
  lastPolledAt?: string;
}

export interface StripeEvent extends Record<string, unknown> {
  id?: string;
  object?: string;
  type?: string;
  created?: number;
  data?: { object?: unknown };
}

export interface StripeResponse<T> {
  data: T[];
  object: string;
  has_more: boolean;
  url: string;
}

export interface Customer {
  id: string;
  email: string;
}

export interface Invoice {
  id: string;
  amount: number;
  currency: string;
  description: string;
}

export interface PaymentIntent {
  id: string;
  amount: number;
  currency: string;
  description: string;
}

export interface Price {
  nickname: string;
  id: string;
  currency: string;
  type: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
}

export interface Subscription {
  id: string;
  collection_method: string;
  description: string;
}
