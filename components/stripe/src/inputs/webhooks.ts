import { input, util } from "@prismatic-io/spectral";
import { cleanStringInput } from "../util";

export const webhookUrl = input({
  label: "Webhook URL",
  type: "string",
  comments: "The URL where webhook events will be sent.",
  example: "https://your-webhook-endpoint.com/webhook",
  placeholder: "Enter webhook URL",
  required: true,
  clean: cleanStringInput,
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
});

export const webhookSecret = input({
  label: "Webhook Secret",
  type: "string",
  comments: "The secret of the webhook used to verify the signature.",
  example: "whsec_1JaOXaDtJQgcyrdSRnsI9KW5",
  placeholder: "Enter webhook secret",
  required: false,
  clean: util.types.toString,
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
