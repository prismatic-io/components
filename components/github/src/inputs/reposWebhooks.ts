import { input, util } from "@prismatic-io/spectral";
import {
  connectionInput,
  events,
  owner,
  repo,
  webhookSecretInput,
} from "./common";
export const hookIdInput = input({
  label: "Hook ID",
  type: "string",
  required: true,
  placeholder: "Enter hook ID",
  example: "12345678",
  clean: util.types.toNumber,
  comments: "The unique identifier of the webhook.",
});
const callbackUrl = input({
  label: "Callback URL",
  type: "string",
  required: true,
  placeholder: "Enter callback URL",
  example: "https://your-webhook-endpoint.com/webhook/abc123",
  clean: util.types.toString,
  comments: "The URL where webhook events will be sent.",
});
const showOnlyInstanceWebhooks = input({
  label: "Show Only Instance Webhooks",
  comments: "When true, shows only webhooks that point to this instance.",
  type: "boolean",
  default: "true",
  clean: util.types.toBool,
});
export const reposListWebhooksInputs = {
  connection: connectionInput,
  owner,
  repo,
  showOnlyInstanceWebhooks,
};
export const reposCreateWebhookInputs = {
  connection: connectionInput,
  owner,
  repo,
  callbackUrl,
  events,
  webhookSecret: webhookSecretInput,
};
export const reposDeleteWebhookInputs = {
  connection: connectionInput,
  owner,
  repo,
  hookId: hookIdInput,
};
export const reposDeleteInstanceWebhooksInputs = {
  connection: connectionInput,
  owner,
  repo,
};
