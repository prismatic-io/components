import { input, util } from "@prismatic-io/spectral";
import { toOptionalNumber, toOptionalString } from "../util";
import { idempotencyKey, squareConnection, validateJSON } from "./common";

const cursorSubscriptions = input({
  type: "string",
  label: "Cursor",
  required: false,
  placeholder: "Enter cursor from previous response",
  comments: "The pagination cursor returned by a previous call to this endpoint.",
  clean: toOptionalString,
});

const includeDisabled = input({
  type: "boolean",
  label: "Include Disabled",
  required: false,
  comments:
    "When true, disabled subscriptions are included in the results. By default, only enabled subscriptions are returned.",
  clean: util.types.toBool,
});

const sortOrderSubscriptions = input({
  type: "string",
  label: "Sort Order",
  required: false,
  placeholder: "Select sort order",
  example: "DESC",
  comments:
    "The sort order for subscriptions by creation date. Options: ASC (oldest first), DESC (newest first).",
  clean: toOptionalString,
});

const limitSubscriptions = input({
  type: "string",
  label: "Limit",
  required: false,
  placeholder: "Enter maximum results per page",
  example: "100",
  comments: "The maximum number of results to return in a single page.",
  clean: toOptionalNumber,
});

const subscriptionId = input({
  type: "string",
  label: "Subscription ID",
  required: true,
  comments: "The unique identifier for the webhook subscription.",
  example: "wbhk_b35f6b3145074cf9ad513610786c19d5",
  placeholder: "Enter Subscription ID",
  clean: util.types.toString,
  dataSource: "selectWebhookSubscription",
});

const webhookSubscription = input({
  type: "code",
  label: "Webhook Subscription",
  language: "json",
  comments:
    "The webhook subscription data in JSON format. See [Square Webhook Subscription](https://developer.squareup.com/docs/webhooks-api/subscribe-to-events) for configuration details.",
  example: JSON.stringify(
    {
      name: "Order Updates Webhook",
      enabled: true,
      event_types: ["order.created", "order.updated"],
      notification_url: "https://your-webhook-endpoint.com/square/webhooks",
    },
    null,
    2,
  ),
  clean: (input) => validateJSON(input),
});

const updatedWebhookSubscription = input({
  type: "code",
  label: "Webhook Subscription",
  language: "json",
  required: true,
  default: JSON.stringify(
    {
      name: "Updated Order Webhook",
      enabled: true,
      event_types: ["order.created", "order.updated", "order.fulfilled"],
      notification_url: "https://your-webhook-endpoint.com/square/webhooks",
    },
    null,
    2,
  ),
  comments:
    "The updated webhook subscription data in JSON format. Include only the fields to modify.",
  clean: (input) => validateJSON(input),
});

const deleteSubscriptionId = input({
  type: "string",
  label: "Subscription ID",
  required: true,
  placeholder: "Enter Subscription ID",
  example: "wbhk_b35f6b3145074cf9ad513610786c19d5",
  comments: "The unique identifier for the webhook subscription to delete.",
  clean: util.types.toString,
});

export const listWebhookSubscriptionsInputs = {
  squareConnection,
  cursorSubscriptions,
  limitSubscriptions,
  includeDisabled,
  sortOrderSubscriptions,
};

export const retrieveWebhookSubscriptionInputs = {
  squareConnection,
  subscriptionId,
};

export const createWebhookSubscriptionInputs = {
  squareConnection,
  idempotencyKey,
  webhookSubscription,
};

export const updateWebhookSubscriptionInputs = {
  squareConnection,
  subscriptionId,
  updatedWebhookSubscription,
};

export const deleteWebhookSubscriptionInputs = {
  squareConnection,
  deleteSubscriptionId,
};

export const deleteInstanceWebhooksInputs = {
  squareConnection,
};
