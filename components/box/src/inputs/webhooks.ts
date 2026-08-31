import { input, structuredObjectInput, util } from "@prismatic-io/spectral";
import {
  connectionInput,
  fetchAll,
  limit,
  marker,
  signatureKey,
  targetId,
  targetType,
  triggerTypes,
} from "./common";
export const address = input({
  label: "Webhook URL",
  placeholder: "Enter webhook URL",
  comments:
    "The URL where webhook events will be sent. Reference a flow's URL from the trigger payload.",
  type: "string",
  required: true,
  example: "https://hooks.example.com/box/abc123",
  clean: util.types.toString,
});
export const webhookId = input({
  label: "Webhook ID",
  placeholder: "Enter webhook ID",
  comments: "The unique identifier of the webhook.",
  type: "string",
  example: "375893453",
  required: true,
  dataSource: "selectWebhook",
  clean: util.types.toString,
});
export const showOnlyInstanceWebhooks = input({
  label: "Show Only Instance Webhooks",
  comments: "When true, returns only webhooks that point to this instance.",
  type: "boolean",
  required: false,
  default: "true",
  clean: util.types.toBool,
});
export const webhookPagination = structuredObjectInput({
  label: "Pagination",
  required: false,
  comments: "Marker and limit controls for paging through results.",
  inputs: { limit, marker },
});
export const listWebhooksInputs = {
  boxConnection: connectionInput,
  fetchAll,
  pagination: webhookPagination,
  showOnlyInstanceWebhooks,
};
export const createWebhookInputs = {
  address,
  targetId,
  targetType,
  triggerTypes,
  primarySignatureKey: { ...signatureKey, label: "Primary Signature Key" },
  secondarySignatureKey: {
    ...signatureKey,
    label: "Secondary Signature Key",
  },
  boxConnection: connectionInput,
};
export const deleteWebhookInputs = {
  boxConnection: connectionInput,
  webhookId,
};
export const deleteInstanceWebhooksInputs = {
  boxConnection: connectionInput,
};
