import { input, util } from "@prismatic-io/spectral";
import {
  cleanRequiredStringListInput,
  cleanStringInput,
  cleanStringListInput,
} from "../util";
import { connectionInput, cursorPagination, fetchAll, timeout } from "./common";
export const webhookUrl = input({
  label: "Webhook URL",
  type: "string",
  comments: "The URL where webhook events will be sent.",
  example: "https://your-webhook-endpoint.com/webhook",
  placeholder: "Enter webhook URL",
  required: true,
  clean: util.types.toString,
});
export const webhookEvents = input({
  label: "Webhook Events",
  type: "string",
  collection: "valuelist",
  comments:
    "For each item, provide a string value representing the event type to track. For more information, see [Stripe event types](https://docs.stripe.com/api/events/types).",
  example: "payment_intent.created",
  placeholder: "Enter event type",
  required: true,
  clean: cleanRequiredStringListInput,
});
export const webhookSecret = input({
  label: "Webhook Secret",
  type: "password",
  comments: "The secret of the webhook used to verify the signature.",
  example: "whsec_XXXXXXXXXXXXXXXXXXXXXXXX",
  placeholder: "Enter webhook secret",
  required: false,
  clean: cleanStringInput,
});
export const disableWebhookValidation = input({
  label: "Disable Webhook Validation",
  type: "boolean",
  required: false,
  comments:
    "When true, webhook signature validation will be skipped. This is useful for manually testing the trigger without needing a signed request.",
  default: "false",
  clean: util.types.toBool,
});
export const webhookId = input({
  label: "Webhook ID",
  type: "string",
  comments: "The unique identifier for the webhook.",
  example: "we_1JaOXaDtJQgcyrdSRnsI9KW5",
  placeholder: "Enter Webhook ID",
  required: true,
  clean: util.types.toString,
});
export const createWebhookInputs = {
  webhookUrl,
  webhookEvents,
  timeout,
  stripeConnection: connectionInput,
};
export const deleteWebhookInputs = {
  webhookId: {
    ...webhookId,
    comments: "The ID of the webhook to delete",
  },
  timeout,
  stripeConnection: connectionInput,
};
export const deleteWebhooksInputs = {
  timeout,
  stripeConnection: connectionInput,
};
export const getWebhookInputs = {
  webhookId,
  timeout,
  stripeConnection: connectionInput,
};
export const listWebhooksInputs = {
  fetchAll,
  pagination: cursorPagination,
  timeout,
  stripeConnection: connectionInput,
};
export const updateWebhookInputs = {
  webhookId: {
    ...webhookId,
    comments: "The ID of the webhook to update",
  },
  webhookUrl: {
    ...webhookUrl,
    comments: "The URL the webhook will send requests to",
    required: false,
    clean: cleanStringInput,
  },
  webhookEvents: {
    ...webhookEvents,
    comments: "The events the webhook will listen for",
    required: false,
    clean: cleanStringListInput,
  },
  timeout,
  stripeConnection: connectionInput,
};
