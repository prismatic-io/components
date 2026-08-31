import type Stripe from "stripe";
export type ClassResource =
  | Stripe.WebhookEndpointsResource
  | Stripe.PricesResource
  | Stripe.Checkout.SessionsResource;
export type StripeResource =
  | Stripe.WebhookEndpoint
  | Stripe.Price
  | Stripe.Checkout.Session;
export type PaginatedRecord = Stripe.ApiListPromise<StripeResource>;
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
export interface StripeResponse<T> {
  data: T[];
  object: string;
  has_more: boolean;
  url: string;
}
